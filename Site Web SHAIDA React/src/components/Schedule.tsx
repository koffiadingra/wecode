import { Clock, Users } from 'lucide-react';

export function Schedule() {
  const schedule = [
    { day: 'Mercredi', time: '16:00 - 18:30', class: 'Tous niveaux', instructor: 'Grand Maître KOUAME' },
    { day: 'Samedi', time: '16:00 - 18:30', class: 'Tous niveaux', instructor: 'Grand Maître KOUAME' },
    { day: 'Dimanche', time: '15:30 - 18:00', class: 'Tous niveaux', instructor: 'Grand Maître KOUAME' }
  ];

  const groupedSchedule = schedule.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, typeof schedule>);

  return (
    <section id="horaires" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-6">
            Horaires des Cours
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Des créneaux adaptés à tous les emplois du temps pour vous permettre de pratiquer régulièrement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {Object.entries(groupedSchedule).map(([day, classes]) => (
            <div key={day} className="bg-neutral-50 border-t-4 border-red-600 p-6">
              <h3 className="text-2xl mb-4">{day}</h3>
              <div className="space-y-4">
                {classes.map((classItem, index) => (
                  <div key={index} className="pb-4 border-b border-neutral-200 last:border-0">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <Clock size={16} />
                      <span>{classItem.time}</span>
                    </div>
                    <p className="mb-1">{classItem.class}</p>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Users size={14} />
                      <span>{classItem.instructor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}