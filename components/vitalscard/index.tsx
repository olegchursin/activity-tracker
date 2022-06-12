import styles from './VitalsCard.module.css';
import Link from 'next/link';

interface IVital {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly timestamp: string;
}

interface IVitalsCardProps {
  readonly vital: IVital;
}

const VitalsCard: React.FunctionComponent<IVitalsCardProps> = ({ vital }) => {
  console.log('vital', vital);

  return (
    <Link href={`/vital/${vital.id}`}>
      <div className={styles.vitalsCard}>
        <div className={styles.vitalsCardFooter}>
          <div className={styles.vitalsCardName}>
            <h3>Name: {vital.name}</h3>
          </div>

          <div className={styles.vitalsCardType}>
            <span>Value: </span>
            <span>{vital.value}</span>
          </div>

          <div className={styles.vitalsCardType}>
            <span>Timestamp: </span>
            <span>{vital.timestamp}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VitalsCard;
