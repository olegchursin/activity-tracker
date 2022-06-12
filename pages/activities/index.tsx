import ActivityCard from '../../components/activityCard';
import AddActivity from '../../components/addactivity';
import styles from './Activities.module.css';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';

const prisma = new PrismaClient();

const Activities: React.FunctionComponent<any> = props => {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const activities = props.activities;

  return (
    <div className={styles.foodsCnt}>
      <div className={styles.breadcrumbs}>
        <div>
          <h2>Activities</h2>
        </div>

        <div>
          <button
            className="btn"
            style={{
              paddingLeft: '15px',
              paddingRight: '15px',
              fontWeight: '500'
            }}
            onClick={() => setShowAddFoodModal(pV => !pV)}
          >
            Add Activity
          </button>
        </div>
      </div>

      <div className={styles.activities}>
        {activities?.map(activity => (
          <ActivityCard activity={activity} key={activity.id} />
        ))}
      </div>
      {showAddFoodModal ? (
        <AddActivity closeModal={() => setShowAddFoodModal(false)} />
      ) : null}
    </div>
  );
};

export async function getServerSideProps() {
  const activities = await prisma.activity.findMany();
  const serializedActivities = activities.map(activity => {
    return { ...activity, timestamp: activity.timestamp.toString() as any };
  });

  return {
    props: {
      activities: serializedActivities
    }
  };
}

export default Activities;
