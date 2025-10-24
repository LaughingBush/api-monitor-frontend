import { ApiRequest } from '../types';
import './RequestsGraph.css';

interface RequestsGraphProps {
  requests: ApiRequest[];
}

interface TimeSlot {
  time: string;
  count: number;
}

export const RequestsGraph = ({ requests }: RequestsGraphProps) => {
  // Group requests by time intervals (e.g., hourly)
  const getTimeSlots = (): TimeSlot[] => {
    if (requests.length === 0) return [];

    // Create 24 hourly slots
    const now = new Date();
    const slots: TimeSlot[] = [];

    for (let i = 23; i >= 0; i--) {
      const slotTime = new Date(now.getTime() - i * 60 * 60 * 1000);
      const slotStart = new Date(slotTime);
      slotStart.setMinutes(0, 0, 0);
      const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

      const count = requests.filter(req => {
        const reqTime = new Date(req.createdAt);
        return reqTime >= slotStart && reqTime < slotEnd;
      }).length;

      slots.push({
        time: slotTime.getHours().toString().padStart(2, '0') + ':00',
        count,
      });
    }

    return slots;
  };

  const timeSlots = getTimeSlots();
  const maxCount = Math.max(...timeSlots.map(s => s.count), 1);

  return (
    <div className="requests-graph">
      <div className="graph-header">
        <h3>Requests Over Time (Last 24 Hours)</h3>
        <div className="graph-stats">
          <span className="stat">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{requests.length}</span>
          </span>
          <span className="stat">
            <span className="stat-label">Peak:</span>
            <span className="stat-value">{maxCount}/hr</span>
          </span>
        </div>
      </div>
      <div className="graph-container">
        <div className="graph-bars">
          {timeSlots.map((slot, index) => {
            const height = maxCount > 0 ? (slot.count / maxCount) * 100 : 0;
            return (
              <div key={index} className="graph-bar-wrapper">
                <div
                  className="graph-bar"
                  style={{ height: `${height}%` }}
                  title={`${slot.time}: ${slot.count} requests`}
                >
                  <div className="graph-bar-inner"></div>
                </div>
                {index % 4 === 0 && (
                  <span className="graph-label">{slot.time}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
