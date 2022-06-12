import styles from './MealCard.module.css';
import Link from 'next/link';

interface IMeal {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly timestamp: string;
}

interface IMealCardProps {
  readonly meal: IMeal;
}

const MealCard: React.FunctionComponent<IMealCardProps> = ({ meal }) => {
  console.log('meal', meal);

  return (
    <Link href={`/vital/${meal.id}`}>
      <div className={styles.mealCard}>
        <div className={styles.mealCardFooter}>
          <div className={styles.mealCardName}>
            <h3>Name: {meal.name}</h3>
          </div>

          <div className={styles.mealCardType}>
            <span>Description: </span>
            <div className={styles.textLines}>
              {meal.description.split('\n').map(line => {
                return <div>{line}</div>;
              })}
            </div>
          </div>

          <div className={styles.mealCardType}>
            <span>Timestamp: </span>
            <span>{meal.timestamp}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
