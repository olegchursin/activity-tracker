import styles from './ActivityCard.module.css';
import Link from 'next/link';

interface IActivityCard {
  readonly id: string;
  readonly type: string;
  readonly name?: string;
  readonly duration?: string;
  readonly timestamp: string;
  readonly description?: string;
}

const ActivityCard: React.FunctionComponent<any> = ({ activity }) => {
  console.log('activity', activity);

  return (
    <Link href={`/activity/${activity.id}`}>
      <div className={styles.activityCard}>
        <div className={styles.activityCardFooter}>
          <div className={styles.activityCardName}>
            <h3>Name: {activity.name}</h3>
          </div>

          <div className={styles.activityCardType}>
            <span>Type</span>
            <span>{activity.type}</span>
          </div>

          <div className={styles.activityCardType}>
            <span>Timestamp</span>
            <span>{activity.timestamp}</span>
          </div>

          <div className={styles.activityCardType}>
            <span>Duration</span>
            <span>{activity.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
