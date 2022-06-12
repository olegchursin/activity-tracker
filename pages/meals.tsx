import styles from './activities/Activities.module.css';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import MealCard from '../components/mealCard';
import AddMeal from '../components/addMeal';

const prisma = new PrismaClient();

const Meals: React.FunctionComponent<any> = ({ meals }) => {
  const [showAddMealModal, setShowAddMealModal] = useState(false);

  console.log('meals', meals);

  return (
    <div>
      <div className={styles.breadcrumbs}>
        <div>
          <h2>Meals</h2>
        </div>

        <div>
          <button
            className="btn"
            style={{
              paddingLeft: '15px',
              paddingRight: '15px',
              fontWeight: '500'
            }}
            onClick={() => setShowAddMealModal(pV => !pV)}
          >
            Add Meal
          </button>
        </div>
      </div>

      <div className={styles.activities}>
        {meals?.map(meal => (
          <MealCard meal={meal} key={meal.id} />
        ))}
      </div>

      {showAddMealModal ? (
        <AddMeal closeModal={() => setShowAddMealModal(false)} />
      ) : null}
    </div>
  );
};

export async function getServerSideProps() {
  const meals = await prisma.meal.findMany();
  const serializedMeals = meals.map(meal => {
    return { ...meal, timestamp: meal.timestamp.toString() as any };
  });

  return {
    props: {
      meals: serializedMeals
    }
  };
}

export default Meals;
