import React, { useState } from 'react';
import { useAuth } from './AuthContext';

// CSS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'Poppins, sans-serif',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  rightColumn: {
    width: '30%',
    margin: '20px',
  },
  profileCard: {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profileDetails: {
    marginLeft: '20px',
    width: '100%',
    textTransform: 'capitalize',
  },
  profilePicture: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  detailItem: {
    margin: '5px 0',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    height: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    marginLeft: '10px',
  },
  progressBar: {
    height: '100%',
    borderRadius: '10px',
    width: '0%',
    animation: 'progress 2s ease-in-out forwards',
  },
  '@keyframes progress': {
    '0%': { width: '0%' },
    '100%': { width: '75%' }, // Example to simulate progress
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 20px',
    backgroundColor: '#001529',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#ff474c',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    border: '1px solid #ff474c',
    color: '#ff474c',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#ff474c',
    color: '#fff',
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
    color: '#a0a0a0',
    cursor: 'not-allowed',
  },
  createButton: {
    marginBottom: '20px',
    display: 'block',
    width: '100%',
  },
  addButton: {
    marginLeft: '10px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    marginRight: '16px',
  },
  workoutsCard: {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  exerciseCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    height: 'calc(100vh - 20vh)', // Adjust to full height minus margins
    overflowY: 'auto',
  },
  exerciseList: {
    listStyleType: 'none',
    padding: 0,
  },
  exerciseListItem: {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  exerciseListItemHover: {
    backgroundColor: '#f0f0f0',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formLabel: {
    marginBottom: '5px',
    display: 'block',
    fontWeight: '500',
  },
  formInput: {
    width: '100%',
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
    boxSizing: 'border-box',
  },
};

const Modal = ({ onClose, onSubmit }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: exerciseName, description: exerciseDescription });
    onClose();
  };

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Create Exercise</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Exercise Name</label>
            <input
              type="text"
              style={styles.formInput}
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Description</label>
            <input
              type="text"
              style={styles.formInput}
              value={exerciseDescription}
              onChange={(e) => setExerciseDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

const WorkoutModal = ({ workout, onClose, onSubmit }) => {
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...workout, sets, reps, duration });
    onClose();
  };

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Add Set, Reps and Duration</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Sets</label>
            <input
              type="number"
              style={styles.formInput}
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Reps</label>
            <input
              type="number"
              style={styles.formInput}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Duration (minutes)</label>
            <input
              type="number"
              style={styles.formInput}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exercises, setExercises] = useState([
    { name: 'Push-ups', description: 'Do 20 push-ups' },
    { name: 'Running', description: 'Run for 30 minutes' },
    { name: 'Squats', description: 'Do 15 squats' },
  ]);
  const [myWorkouts, setMyWorkouts] = useState([]);

  const progress = 5;

  const placeholderImage = 'data:image/png;base64,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';

  const getProgressBarColor = (progress) => {
    if (progress <= 33) return '#ff4d4f'; // Red
    if (progress <= 66) return '#ffa940'; // Orange
    return '#00E500'; // Green
  };

  const handleCreateExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  const handleAddExercise = (exercise) => {
    setMyWorkouts([...myWorkouts, exercise]);
  };

  const handleAddSetAndDuration = (workout) => {
    // Handle adding set, reps, and duration to the workout
    console.log('Workout with set, reps, and duration:', workout);
  };

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setIsWorkoutModalOpen(true);
  };

  const isExerciseAdded = (exercise) => {
    return myWorkouts.some(workout => workout.name === exercise.name);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div>Fitness App</div>
        <div style={styles.userInfo}>
          {user && (
            <>
              <span style={styles.username}>{user.username}</span>
              <button
                onClick={logout}
                style={{ ...styles.button, ...styles.buttonOutline }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                  e.target.style.color = styles.buttonHover.color;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ff474c';
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          <div style={styles.profileCard}>
            <div style={styles.profileContainer}>
              <img
                src={user.profilePicture || placeholderImage}
                alt="Profile"
                style={styles.profilePicture}
              />
              <div style={styles.profileDetails}>
                <div style={styles.detailItem}><strong>Name:</strong> {user.username}</div>
                <div style={styles.detailItem}><strong>Weight:</strong> {Math.floor(Math.random() * 60) + 50} kg</div>
                <div style={styles.detailItem}><strong>Height:</strong> {Math.floor(Math.random() * 51) + 150} cm</div>
                <div style={styles.detailItem}>
                  <div style={styles.progressContainer}>
                    <strong>Progress:</strong>
                    <div style={styles.progressBarContainer}>
                      <div
                        style={{
                          ...styles.progressBar,
                          width: `${progress}%`,
                          backgroundColor: getProgressBarColor(progress),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.workoutsCard}>
            <div style={styles.cardHeader}>My Workouts</div>
            <ul style={styles.exerciseList}>
              {myWorkouts.map((workout, index) => (
                <li
                  key={index}
                  style={styles.exerciseListItem}
                  onClick={() => handleWorkoutClick(workout)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = styles.exerciseListItemHover.backgroundColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div>
                    <strong>{workout.name}</strong> - {workout.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <div style={styles.exerciseCard}>
            <div style={styles.cardHeader}>Exercise</div>
            <button
              style={{ ...styles.button, ...styles.createButton }}
              onClick={() => setIsModalOpen(true)}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.target.style.color = styles.buttonHover.color;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ff474c';
                e.target.style.color = '#fff';
              }}
            >
              Create Exercise
            </button>
            <ul style={styles.exerciseList}>
              {exercises.map((exercise, index) => (
                <li key={index} style={styles.exerciseListItem}>
                  <div>
                    <strong>{exercise.name}</strong> - {exercise.description}
                  </div>
                  <button
                    style={{
                      ...styles.button,
                      ...styles.addButton,
                      ...(isExerciseAdded(exercise) ? styles.buttonDisabled : {}),
                    }}
                    onClick={() => handleAddExercise(exercise)}
                    onMouseOver={(e) => {
                      if (!isExerciseAdded(exercise)) {
                        e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                        e.target.style.color = styles.buttonHover.color;
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isExerciseAdded(exercise)) {
                        e.target.style.backgroundColor = '#ff474c';
                        e.target.style.color = '#fff';
                      }
                    }}
                    disabled={isExerciseAdded(exercise)}
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateExercise}
        />
      )}
      {isWorkoutModalOpen && selectedWorkout && (
        <WorkoutModal
          workout={selectedWorkout}
          onClose={() => setIsWorkoutModalOpen(false)}
          onSubmit={handleAddSetAndDuration}
        />
      )}
    </div>
  );
};

export default Navbar;
