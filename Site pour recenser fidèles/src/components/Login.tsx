import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase/config';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Church, User, Users } from 'lucide-react';
import { enableDemoMode, setDemoUser, DEMO_USERS, type UserRole } from '../utils/demoData';

export function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('recenseur');
  const [loading, setLoading] = useState(false);
  const [showDemoOptions, setShowDemoOptions] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Sauvegarder les informations supplémentaires dans Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      toast.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      setIsSignUp(false);
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Cet email est déjà utilisé');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Le mot de passe doit contenir au moins 6 caractères');
      } else {
        toast.error('Erreur lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connexion réussie !');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        toast.error('Email ou mot de passe incorrect');
      } else {
        toast.error('Erreur lors de la connexion');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoUser: typeof DEMO_USERS[0]) => {
    enableDemoMode();
    setDemoUser(demoUser.email, demoUser.role, demoUser.name);
    toast.success(`Connecté en mode démo en tant que ${demoUser.name}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-full shadow-lg">
              <Church className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Chapelle Pleine de Gloire
            </h1>
            <CardTitle className="text-2xl">
              {isSignUp ? 'Créer un compte' : 'Connexion'}
            </CardTitle>
          </div>
          <CardDescription className="text-center">
            {isSignUp
              ? 'Créez un compte pour gérer l\'église'
              : 'Accédez à votre espace'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isSignUp}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pasteur">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Pasteur (accès complet)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="recenseur">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Recenseur (présences uniquement)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    {role === 'pasteur' 
                      ? 'Accès complet : gestion des fidèles, présences et statistiques'
                      : 'Accès limité : enregistrement des présences uniquement'}
                  </p>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" disabled={loading}>
              {loading
                ? 'Chargement...'
                : isSignUp
                ? 'Créer un compte'
                : 'Se connecter'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              type="button"
            >
              {isSignUp
                ? 'Déjà un compte ? Se connecter'
                : 'Créer un compte'}
            </Button>
          </div>
          <div className="mt-2 text-center border-t pt-4 space-y-2">
            {!showDemoOptions ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowDemoOptions(true)}
                type="button"
              >
                🎭 Mode Démo (tester sans compte)
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-3">Choisir un compte démo :</p>
                {DEMO_USERS.map((demoUser) => (
                  <Button
                    key={demoUser.email}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleDemoLogin(demoUser)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      {demoUser.role === 'pasteur' ? (
                        <User className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Users className="w-5 h-5 text-purple-600" />
                      )}
                      <div className="text-left">
                        <div className="font-medium">{demoUser.name}</div>
                        <div className="text-xs text-gray-500">
                          {demoUser.email} • {demoUser.role === 'pasteur' ? 'Accès complet' : 'Présences'}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDemoOptions(false)}
                  type="button"
                >
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}