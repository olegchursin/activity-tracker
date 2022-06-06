import { useRef, useState } from 'react';
import axios from 'axios';

const AddActivity = ({ closeModal }) => {
  const [disable, setDisable] = useState(false);
  const formRef = useRef();

  async function addNewActivity() {
    setDisable(true);
    const {
      addActivityName,
      addActivityTimestamp,
      addActivityType,
      addActivityDescription,
      addActivityDuration
    } = formRef.current as any;

    const name = addActivityName.value;
    const type = addActivityType.value;
    const description = addActivityDescription.value;
    const duration = parseInt(addActivityDuration.value, 10);
    const timestamp = new Date(addActivityTimestamp.value);

    await axios.post('/api/addActivity', {
      name,
      type,
      timestamp,
      duration,
      description
    });
    setDisable(false);
    window.location.reload();
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Activity</h3>
          <span
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={() => closeModal()}
          >
            X
          </span>
        </div>
        <div className="modal-body content">
          <form ref={formRef}>
            <div style={{ display: 'flex', margin: '2px 2px 0 0' }}>
              <div
                style={{ flex: '1 1 100%', margin: '0 0 2px 5px' }}
                className="inputField"
              >
                <div className="label">
                  <label>Name</label>
                </div>
                <div>
                  <input name="addActivityName" type="text" />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', margin: '2px 2px 0 0' }}>
              <div
                style={{ flex: '1 1 100%', margin: '0 0 2px 5px' }}
                className="inputField"
              >
                <div className="label">
                  <label>Timestamp</label>
                </div>
                <div>
                  <input
                    name="addActivityTimestamp"
                    type="datetime-local"
                    id="activity-timestamp"
                    min="2022-06-01T00:00"
                    max="2022-09-01T00:00"
                  ></input>
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Type</label>
              </div>
              <div>
                <input name="addActivityType" type="text" />
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Duration</label>
              </div>
              <div>
                <input name="addActivityDuration" type="number" />
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  style={{ width: '100%', height: '100px' }}
                  name="addActivityDescription"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button style={{ marginLeft: '0' }} onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            disabled={disable}
            className="btn"
            onClick={() => addNewActivity()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
