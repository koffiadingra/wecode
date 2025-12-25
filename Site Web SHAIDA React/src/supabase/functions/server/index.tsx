import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Helper function to verify user from access token
async function verifyUser(accessToken: string | undefined) {
  if (!accessToken) {
    return { user: null, error: 'No token provided' };
  }

  try {
    // Use the service role client to get user info from the token
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error) {
      console.log('Token verification error:', error);
      return { user: null, error: error.message };
    }
    
    return { user, error: null };
  } catch (err) {
    console.log('Token verification exception:', err);
    return { user: null, error: 'Token verification failed' };
  }
}

// ============ AUTH ROUTES ============

// Check if admin exists
app.get('/make-server-08451ed6/admin/exists', async (c) => {
  try {
    const admins = await kv.getByPrefix('admin:');
    return c.json({ exists: admins.length > 0 });
  } catch (error) {
    console.log('Check admin exists error:', error);
    return c.json({ error: 'Failed to check admin' }, 500);
  }
});

// Admin signup (first time setup)
app.post('/make-server-08451ed6/admin/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'admin' },
      email_confirm: true, // Auto-confirm since email server isn't configured
    });

    if (error) {
      console.log('Admin signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store admin info in KV
    await kv.set(`admin:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Admin signup error:', error);
    return c.json({ error: 'Failed to create admin account' }, 500);
  }
});

// Create additional admin (admin only)
app.post('/make-server-08451ed6/admin/create-admin', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'admin' },
      email_confirm: true,
    });

    if (error) {
      console.log('Admin creation error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store admin info in KV
    await kv.set(`admin:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, admin: data.user });
  } catch (error) {
    console.log('Admin creation error:', error);
    return c.json({ error: 'Failed to create admin account' }, 500);
  }
});

// Create practitioner account (no email required, using username)
app.post('/make-server-08451ed6/admin/create-practitioner', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const { name, password, belt, degree, yearStarted } = await c.req.json();
    
    // Generate unique email based on name
    const username = name.toLowerCase().replace(/\s+/g, '');
    const timestamp = Date.now();
    const email = `${username}${timestamp}@shaida.local`;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'practitioner', username },
      email_confirm: true,
    });

    if (error) {
      console.log('Practitioner creation error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store practitioner info with searchable credentials
    await kv.set(`practitioner:${data.user.id}`, {
      id: data.user.id,
      username,
      name,
      email, // Store the generated email for login purposes
      belt,
      degree,
      yearStarted,
      attendanceRate: 0,
      totalSessions: 0,
      nextBeltTest: null,
      photoUrl: null,
      createdAt: new Date().toISOString(),
    });

    // Add to practitioners list
    const practitionersList = (await kv.get('practitioners:list')) || [];
    practitionersList.push(data.user.id);
    await kv.set('practitioners:list', practitionersList);

    return c.json({ success: true, practitioner: { ...data.user, username } });
  } catch (error) {
    console.log('Practitioner creation error:', error);
    return c.json({ error: 'Failed to create practitioner account' }, 500);
  }
});

// Practitioner login with name and grade (no email required)
app.post('/make-server-08451ed6/practitioner/login', async (c) => {
  try {
    const { name, belt, degree, password } = await c.req.json();

    console.log('Practitioner login attempt:', { name, belt, degree });

    // Search for practitioner by name, belt and degree
    const allPractitioners = await kv.getByPrefix('practitioner:');
    const practitioner = allPractitioners.find((p: any) => 
      p.name.toLowerCase() === name.toLowerCase() && 
      p.belt === belt && 
      p.degree === degree
    );

    if (!practitioner) {
      console.log('Practitioner not found');
      return c.json({ error: 'Identifiants incorrects' }, 401);
    }

    console.log('Practitioner found, attempting login with email:', practitioner.email);

    // Login using the stored email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: practitioner.email,
      password,
    });

    if (error) {
      console.log('Practitioner login error:', error);
      return c.json({ error: 'Mot de passe incorrect' }, 401);
    }

    console.log('Practitioner login successful');

    return c.json({ 
      success: true, 
      accessToken: data.session.access_token,
      practitioner: {
        id: practitioner.id,
        name: practitioner.name,
        belt: practitioner.belt,
        degree: practitioner.degree,
        username: practitioner.username,
      }
    });
  } catch (error) {
    console.log('Practitioner login error:', error);
    return c.json({ error: 'Erreur lors de la connexion' }, 500);
  }
});

// ============ PRACTITIONER ROUTES ============

// Get practitioner info
app.get('/make-server-08451ed6/practitioner/info', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const practitionerData = await kv.get(`practitioner:${user.id}`);
    if (!practitionerData) {
      return c.json({ error: 'Practitioner not found' }, 404);
    }

    return c.json({ practitioner: practitionerData });
  } catch (error) {
    console.log('Get practitioner info error:', error);
    return c.json({ error: 'Failed to get practitioner info' }, 500);
  }
});

// Upload practitioner photo
app.post('/make-server-08451ed6/practitioner/upload-photo', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { photoData, fileName } = await c.req.json();

    // Ensure bucket exists
    const bucketName = 'make-08451ed6-photos';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
    }

    // Convert base64 to buffer
    const base64Data = photoData.split(',')[1];
    const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    // Upload file
    const filePath = `${user.id}/${fileName}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (uploadError) {
      console.log('Upload error:', uploadError);
      return c.json({ error: uploadError.message }, 400);
    }

    // Get signed URL
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year

    // Update practitioner profile with photo URL
    const practitionerData = await kv.get(`practitioner:${user.id}`);
    if (practitionerData) {
      practitionerData.photoUrl = urlData.signedUrl;
      await kv.set(`practitioner:${user.id}`, practitionerData);
    }

    return c.json({ success: true, photoUrl: urlData.signedUrl });
  } catch (error) {
    console.log('Photo upload error:', error);
    return c.json({ error: 'Failed to upload photo' }, 500);
  }
});

// Change practitioner password
app.post('/make-server-08451ed6/practitioner/change-password', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { newPassword } = await c.req.json();

    // Update password using service role key
    const { error } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (error) {
      console.log('Password change error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    console.log('Password change error:', error);
    return c.json({ error: 'Failed to change password' }, 500);
  }
});

// Get practitioner bulletin
app.get('/make-server-08451ed6/practitioner/bulletin', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get bulletin data
    const bulletinData = await kv.get(`bulletin:${user.id}`);
    const practitionerData = await kv.get(`practitioner:${user.id}`);

    if (!bulletinData) {
      return c.json({ error: 'Bulletin non disponible' }, 404);
    }

    return c.json({ 
      bulletin: bulletinData,
      practitioner: practitionerData
    });
  } catch (error) {
    console.log('Get bulletin error:', error);
    return c.json({ error: 'Failed to get bulletin' }, 500);
  }
});

// Create bulletin (admin only)
app.post('/make-server-08451ed6/admin/bulletin', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const { practitionerId, technicalScore, disciplineScore, physicalScore, comments } = await c.req.json();

    // Calculate average
    const averageScore = ((technicalScore + disciplineScore + physicalScore) / 3).toFixed(2);

    const bulletinData = {
      id: crypto.randomUUID(),
      practitionerId,
      technicalScore,
      disciplineScore,
      physicalScore,
      averageScore: parseFloat(averageScore),
      comments,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`bulletin:${practitionerId}`, bulletinData);

    return c.json({ success: true, bulletin: bulletinData });
  } catch (error) {
    console.log('Create bulletin error:', error);
    return c.json({ error: 'Failed to create bulletin' }, 500);
  }
});

// Get all bulletins (admin only)
app.get('/make-server-08451ed6/admin/bulletins', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const bulletins = await kv.getByPrefix('bulletin:');
    return c.json({ bulletins });
  } catch (error) {
    console.log('Get bulletins error:', error);
    return c.json({ error: 'Failed to get bulletins' }, 500);
  }
});

// ============ ADMIN ROUTES ============

// Get all practitioners (admin only)
app.get('/make-server-08451ed6/admin/practitioners', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const practitionersData = await kv.getByPrefix('practitioner:');
    return c.json({ practitioners: practitionersData });
  } catch (error) {
    console.log('Get practitioners error:', error);
    return c.json({ error: 'Failed to get practitioners' }, 500);
  }
});

// Update practitioner
app.put('/make-server-08451ed6/admin/practitioner/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const practitionerId = c.req.param('id');
    const updates = await c.req.json();

    const practitionerData = await kv.get(`practitioner:${practitionerId}`);
    if (!practitionerData) {
      return c.json({ error: 'Practitioner not found' }, 404);
    }

    const updatedData = { ...practitionerData, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`practitioner:${practitionerId}`, updatedData);

    return c.json({ success: true, practitioner: updatedData });
  } catch (error) {
    console.log('Update practitioner error:', error);
    return c.json({ error: 'Failed to update practitioner' }, 500);
  }
});

// Delete practitioner
app.delete('/make-server-08451ed6/admin/practitioner/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const practitionerId = c.req.param('id');

    // Remove from practitioners list
    const practitionersList = (await kv.get('practitioners:list')) || [];
    const updatedList = practitionersList.filter((id: string) => id !== practitionerId);
    await kv.set('practitioners:list', updatedList);

    // Delete practitioner data
    await kv.del(`practitioner:${practitionerId}`);

    // Delete related data
    await kv.del(`attendance:${practitionerId}`);
    await kv.del(`progression:${practitionerId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Delete practitioner error:', error);
    return c.json({ error: 'Failed to delete practitioner' }, 500);
  }
});

// ============ SCHEDULE & EVENTS ROUTES ============

// Get all schedules
app.get('/make-server-08451ed6/schedules', async (c) => {
  try {
    const schedules = (await kv.get('schedules')) || [];
    return c.json({ schedules });
  } catch (error) {
    console.log('Get schedules error:', error);
    return c.json({ error: 'Failed to get schedules' }, 500);
  }
});

// Update schedules (admin only)
app.put('/make-server-08451ed6/admin/schedules', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const { schedules } = await c.req.json();
    await kv.set('schedules', schedules);

    return c.json({ success: true, schedules });
  } catch (error) {
    console.log('Update schedules error:', error);
    return c.json({ error: 'Failed to update schedules' }, 500);
  }
});

// Get all events
app.get('/make-server-08451ed6/events', async (c) => {
  try {
    const eventsData = await kv.getByPrefix('event:');
    return c.json({ events: eventsData });
  } catch (error) {
    console.log('Get events error:', error);
    return c.json({ error: 'Failed to get events' }, 500);
  }
});

// Create event (admin only)
app.post('/make-server-08451ed6/admin/event', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const eventData = await c.req.json();
    const eventId = crypto.randomUUID();

    await kv.set(`event:${eventId}`, {
      ...eventData,
      id: eventId,
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, eventId });
  } catch (error) {
    console.log('Create event error:', error);
    return c.json({ error: 'Failed to create event' }, 500);
  }
});

// Update event (admin only)
app.put('/make-server-08451ed6/admin/event/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const eventId = c.req.param('id');
    const updates = await c.req.json();

    const eventData = await kv.get(`event:${eventId}`);
    if (!eventData) {
      return c.json({ error: 'Event not found' }, 404);
    }

    const updatedData = { ...eventData, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`event:${eventId}`, updatedData);

    return c.json({ success: true, event: updatedData });
  } catch (error) {
    console.log('Update event error:', error);
    return c.json({ error: 'Failed to update event' }, 500);
  }
});

// Delete event (admin only)
app.delete('/make-server-08451ed6/admin/event/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const eventId = c.req.param('id');
    await kv.del(`event:${eventId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Delete event error:', error);
    return c.json({ error: 'Failed to delete event' }, 500);
  }
});

// ============ ATTENDANCE ROUTES ============

// Record attendance (admin only)
app.post('/make-server-08451ed6/admin/attendance', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const { practitionerId, date, session, present } = await c.req.json();

    const attendanceKey = `attendance:${practitionerId}`;
    const attendanceData = (await kv.get(attendanceKey)) || [];

    attendanceData.push({
      date,
      session,
      present,
      recordedAt: new Date().toISOString(),
    });

    await kv.set(attendanceKey, attendanceData);

    // Update total sessions and attendance rate
    const practitionerData = await kv.get(`practitioner:${practitionerId}`);
    if (practitionerData) {
      const totalSessions = attendanceData.filter((a: any) => a.present).length;
      const attendanceRate = Math.round((totalSessions / attendanceData.length) * 100);

      await kv.set(`practitioner:${practitionerId}`, {
        ...practitionerData,
        totalSessions,
        attendanceRate,
      });
    }

    return c.json({ success: true });
  } catch (error) {
    console.log('Record attendance error:', error);
    return c.json({ error: 'Failed to record attendance' }, 500);
  }
});

// ============ CERTIFICATION ROUTES ============

// Award certification/grade (admin only)
app.post('/make-server-08451ed6/admin/certification', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const { practitionerId, belt, degree, date } = await c.req.json();

    // Update practitioner's current belt
    const practitionerData = await kv.get(`practitioner:${practitionerId}`);
    if (!practitionerData) {
      return c.json({ error: 'Practitioner not found' }, 404);
    }

    await kv.set(`practitioner:${practitionerId}`, {
      ...practitionerData,
      belt,
      degree,
    });

    // Add to progression history
    const progressionKey = `progression:${practitionerId}`;
    const progressionData = (await kv.get(progressionKey)) || [];

    progressionData.push({
      belt,
      degree,
      date,
      awardedAt: new Date().toISOString(),
    });

    await kv.set(progressionKey, progressionData);

    return c.json({ success: true });
  } catch (error) {
    console.log('Award certification error:', error);
    return c.json({ error: 'Failed to award certification' }, 500);
  }
});

// Get practitioner's progression history
app.get('/make-server-08451ed6/progression/:id', async (c) => {
  try {
    const practitionerId = c.req.param('id');
    const progressionData = (await kv.get(`progression:${practitionerId}`)) || [];

    return c.json({ progression: progressionData });
  } catch (error) {
    console.log('Get progression error:', error);
    return c.json({ error: 'Failed to get progression' }, 500);
  }
});

// ============ NEWS ROUTES ============

// Get all news
app.get('/make-server-08451ed6/news', async (c) => {
  try {
    const newsData = await kv.getByPrefix('news:');
    return c.json({ news: newsData });
  } catch (error) {
    console.log('Get news error:', error);
    return c.json({ error: 'Failed to get news' }, 500);
  }
});

// Create news (admin only)
app.post('/make-server-08451ed6/admin/news', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const newsData = await c.req.json();
    const newsId = crypto.randomUUID();

    await kv.set(`news:${newsId}`, {
      ...newsData,
      id: newsId,
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, newsId });
  } catch (error) {
    console.log('Create news error:', error);
    return c.json({ error: 'Failed to create news' }, 500);
  }
});

// Update news (admin only)
app.put('/make-server-08451ed6/admin/news/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const newsId = c.req.param('id');
    const updates = await c.req.json();

    const newsData = await kv.get(`news:${newsId}`);
    if (!newsData) {
      return c.json({ error: 'News not found' }, 404);
    }

    const updatedData = { ...newsData, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`news:${newsId}`, updatedData);

    return c.json({ success: true, news: updatedData });
  } catch (error) {
    console.log('Update news error:', error);
    return c.json({ error: 'Failed to update news' }, 500);
  }
});

// Delete news (admin only)
app.delete('/make-server-08451ed6/admin/news/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { user, error: authError } = await verifyUser(accessToken);

    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);
    if (!adminData || adminData.role !== 'admin') {
      return c.json({ error: 'Forbidden - Admin only' }, 403);
    }

    const newsId = c.req.param('id');
    await kv.del(`news:${newsId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Delete news error:', error);
    return c.json({ error: 'Failed to delete news' }, 500);
  }
});

Deno.serve(app.fetch);