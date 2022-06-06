import { useState, useRef } from 'react';
import axios from 'axios';

const EditActivity: React.FunctionComponent<any> = ({
  activity,
  closeModal
}) => {
  const formRef = useRef();
  const [disable, setDisable] = useState(false);

  async function editActivity() {
    setDisable(true);
    const {
      editActivityName,
      editActivityType,
      editActivityDuration,
      editActivityDescription
    } = formRef.current as any;

    const name = editActivityName.value;
    const description = editActivityDescription.value;
    const type = editActivityType.value;
    const duration = parseInt(editActivityDuration.value, 10);

    await axios.put('/api/editActivity', {
      id: parseInt(activity?.id),
      name,
      type,
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
          <h3>Edit Activity</h3>
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
                  <input
                    defaultValue={activity?.name}
                    name="editActivityName"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', margin: '2px 2px 0 0' }}>
              <div
                style={{ flex: '1 1 100%', margin: '0 0 2px 5px' }}
                className="inputField"
              >
                <div className="label">
                  <label>Type</label>
                </div>
                <div>
                  <input
                    defaultValue={activity?.type}
                    name="editActivityType"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', margin: '2px 2px 0 0' }}>
              <div
                style={{ flex: '1 1 100%', margin: '0 0 2px 5px' }}
                className="inputField"
              >
                <div className="label">
                  <label>Duration</label>
                </div>
                <div>
                  <input
                    defaultValue={activity?.duration}
                    name="editActivityDuration"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea
                  defaultValue={activity?.description}
                  style={{ width: '100%', height: '100px' }}
                  name="editActivityDescription"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={() => closeModal()}>Cancel</button>
          <button
            disabled={disable}
            className="btn"
            onClick={() => editActivity()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditActivity;
