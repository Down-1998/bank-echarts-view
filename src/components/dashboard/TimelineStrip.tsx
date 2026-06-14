import type { TimelineStep as TimelineStepItem } from '../../types/dashboard';
import styles from '../../App.module.css';
import { getTimelineStepClassName } from './dashboardHelpers';

type TimelineStripProps = {
  timeline: TimelineStepItem[];
};

export function TimelineStrip({ timeline }: TimelineStripProps) {
  return (
    <section className={styles.timelineStrip}>
      {timeline.map((step) => (
        <div key={`${step.time}-${step.title}`} className={getTimelineStepClassName(styles, step.status)}>
          <span className={styles.timelineTime}>{step.time}</span>
          <strong>{step.title}</strong>
          <i />
        </div>
      ))}
    </section>
  );
}
