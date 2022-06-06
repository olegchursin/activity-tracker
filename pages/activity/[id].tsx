import styles from './Activity.module.css';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import EditActivity from '../../components/editactivity';
import axios from 'axios';
import { useRouter } from 'next/router';

const prisma = new PrismaClient();

const Activity: React.FunctionComponent<any> = props => {
  const [showEditActivityModal, setShowEditActivityModal] = useState(false);
  const router = useRouter();
  const { activity } = props;

  async function deleteActivity() {
    if (window.confirm('Do you want to delete this Activity?')) {
      // ...
      await axios.post('/api/deleteActivity', { id: parseInt(activity?.id) });
      router.push('/activities');
    }
  }

  return (
    <div className={styles.activityContainer}>
      <div className={styles.activity}>
        <div className={styles.activityDetails}>
          <div className={styles.activityName}>
            <h1>{activity?.name}</h1>
          </div>

          <div className={styles.activityName}>
            <p>{activity?.type}</p>
          </div>

          <div className={styles.activityName}>
            <p>{activity?.duration}</p>
          </div>

          <div style={{ padding: '5px 0' }}>
            <span>
              <button
                onClick={() => setShowEditActivityModal(pV => !pV)}
                style={{ marginLeft: '0' }}
                className="btn"
              >
                Edit
              </button>

              <button onClick={deleteActivity} className="btn btn-danger">
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
      {showEditActivityModal ? (
        <EditActivity
          activity={activity}
          closeModal={() => setShowEditActivityModal(false)}
        />
      ) : null}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(id) }
  });
  const serializedActivity = {
    ...activity,
    timestamp: activity.timestamp.toString() as any
  };
  return {
    props: {
      activity: serializedActivity
    }
  };
}

export default Activity;
