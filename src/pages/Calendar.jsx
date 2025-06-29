import { useData } from '../context/DataContext';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const { incidents, patients } = useData();
  const [view, setView] = useState('month');
  const now = dayjs();

  const daysToRender = useMemo(() => {
    const start = now.startOf(view);
    const end = now.endOf(view);
    const range = [];
    for (let d = start; d.isBefore(end); d = d.add(1, 'day')) {
      range.push(d);
    }
    return range;
  }, [now, view]);

  const appointmentsByDate = useMemo(() => {
    return incidents.reduce((acc, inc) => {
      const date = dayjs(inc.appointmentDate).format('YYYY-MM-DD');
      if (!acc[date]) acc[date] = [];
      acc[date].push(inc);
      return acc;
    }, {});
  }, [incidents]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Calendar View</h1>
        <div>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 mr-2 font-semibold border rounded ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 font-semibold border rounded ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className={`grid ${view === 'week' ? 'grid-cols-7' : 'grid-cols-7'} gap-2`}>
        {view === 'month' && days.map((day) => (
          <div key={day} className="p-2 text-center font-semibold bg-gray-100 rounded">{day}</div>
        ))}
        {daysToRender.map((d) => {
          const key = d.format('YYYY-MM-DD');
          const events = appointmentsByDate[key] || [];
          return (
            <div key={key} className="p-2 bg-white border rounded min-h-[6rem]">
              <div className="mb-1 text-sm font-bold text-gray-700">{d.date()}</div>
              {events.map((e) => (
                <div key={e.id} className="text-xs p-1 mb-1 bg-blue-100 rounded">
                  {e.title}<br />
                  <span className="text-[10px]">{patients.find(p => p.id === e.patientId)?.name}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}