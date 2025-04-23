import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './ProgressChart.css';

const ProgressChart: React.FC<{ 
  consumed: number; 
  goal: number 
}> = ({ consumed, goal }) => {
  const data = [
    { name: 'Consumed', value: Math.min(consumed, goal) },
    { name: 'Remaining', value: Math.max(0, goal - consumed) }
  ];

  const COLORS = ['#4361ee', '#dee2e6'];

  return (
    <div className="progress-chart">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-center-label">
          <span className="calories-count">{consumed}</span>
          <span className="calories-goal">/ {goal} ккал</span>
        </div>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color consumed"></span>
          <span>Съедено</span>
        </div>
        <div className="legend-item">
          <span className="legend-color remaining"></span>
          <span>Осталось</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;