import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  fetchCurrentUser,
  fetchExercises,
  addExercise,
  fetchUserWorkouts,
  addWorkout,
} from './service';

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
    textTransform: 'capitalize',
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
  };

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Add Workout Details</h2>
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
            Add Workout
          </button>
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const { user, logout } = useAuth();
  const token = localStorage.getItem('accessToken');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    roles: [],
    profilePicture: '',
    weight: 0,
    height: 0,
    progress: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const userData = await fetchCurrentUser(token);
      setUserData(userData);

      const exerciseData = await fetchExercises(token);
      setExercises(exerciseData);

      const workoutData = await fetchUserWorkouts(token);
      setMyWorkouts(workoutData);
    };

    loadData();
  }, [token]);

  const handleCreateExercise = async (exercise) => {
    const newExercise = await addExercise(token, exercise);
    setExercises([...exercises, newExercise]);
  };

  const handleAddExercise = (exercise) => {
    if (!isExerciseAdded(exercise)) {
      setMyWorkouts([...myWorkouts, exercise]);
    }
  };

  const handleAddSetAndDuration = (workout) => {
    addWorkout(token, workout);
    setIsWorkoutModalOpen(false);
  };

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setIsWorkoutModalOpen(true);
  };

  const isExerciseAdded = (exercise) => {
    return myWorkouts.some(workout => workout.name === exercise.name);
  };

  const getProgressBarColor = (progress) => {
    if (progress <= 33) return '#ff4d4f'; // Red
    if (progress <= 66) return '#ffa940'; // Orange
    return '#00E500'; // Green
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div>Fitness App</div>
        <div style={styles.userInfo}>
          {userData && (
            <>
              <span style={styles.username}>{userData.username}</span>
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
                src={userData.profilePicture || 'https://via.placeholder.com/100'}
                alt="Profile"
                style={styles.profilePicture}
              />
              <div style={styles.profileDetails}>
                <div style={styles.detailItem}><strong>Name:</strong> {userData.username}</div>
                <div style={styles.detailItem}><strong>Weight:</strong> {userData.weight} kg</div>
                <div style={styles.detailItem}><strong>Height:</strong> {userData.height} cm</div>
                <div style={styles.detailItem}>
                  <div style={styles.progressContainer}>
                    <strong>Progress:</strong>
                    <div style={styles.progressBarContainer}>
                      <div
                        style={{
                          ...styles.progressBar,
                          width: `${userData.progress}%`,
                          backgroundColor: getProgressBarColor(userData.progress),
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

export default Home;
