import React, { useState } from 'react';
import { useAuth } from './AuthContext';

// CSS styles
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#2563eb',
    color: '#fff',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    height: '90vh',
    boxSizing: 'border-box',
  },
  card: {
    flex: 1,
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '0 16px 16px 16px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    position: 'relative',
  },
  cardHeader: {
    marginBottom: '16px',
    padding: '20px 5px',
    backgroundColor: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  workoutCard: {
    display: 'flex',
    alignItems: 'start',
    gap: '16px',
    marginBottom: '16px',
  },
  workoutImage: {
    borderRadius: '8px',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontWeight: '500',
  },
  workoutDetails: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '8px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    border: '1px solid #3b82f6',
    color: '#3b82f6',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
    borderColor: '#d1d5db',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
  modalBackdrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  addWorkoutForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px',
  },
  formInput: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
  },
};

// Navbar Component
const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <div style={styles.navbar}>
      <div>Fitness App</div>
      <div>
        {user && (
          <>
            <span style={{ marginRight: '16px' }}>{user.username} ({user.roles[0]})</span>
            <button onClick={logout} style={{ ...styles.button, backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// WorkoutCard Component
const WorkoutCard = ({ title, date, duration, image, onView }) => {
  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  return (
    <div style={styles.workoutCard}>
      <div className="flex-shrink-0">
        <img
          alt="Workout Image"
          src={image || defaultImage}
          style={styles.workoutImage}
        />
      </div>
      <div style={styles.workoutInfo}>
        <div style={styles.workoutTitle}>{title}</div>
        <div style={styles.workoutDetails}>{date}</div>
        <div style={styles.workoutDetails}>{duration}</div>
        <button onClick={onView} style={{ ...styles.button, ...styles.buttonOutline }}>
          View
        </button>
      </div>
    </div>
  );
};

// WorkoutList Component
const WorkoutList = ({ title, workouts, onViewWorkout }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.cardTitle}>{title}</div>
      </div>
      <div>
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            title={workout.title}
            date={workout.date}
            duration={workout.duration}
            image={workout.image}
            onView={() => onViewWorkout(workout, title)}
          />
        ))}
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ workout, onClose, disableView }) => {
  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <img src={workout.image} alt={workout.title} style={styles.modalImage} />
        <h2>{workout.title}</h2>
        <p>{workout.date}</p>
        <p>{workout.duration}</p>
        <button style={{ ...styles.button, ...(disableView ? styles.buttonDisabled : {}) }} disabled={disableView}>
          View
        </button>
      </div>
    </div>
  );
};

// AddWorkout Component
const AddWorkout = ({ onAddWorkout }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');

  const handleAddWorkout = (e) => {
    e.preventDefault();
    onAddWorkout({ title, date, duration, image });
    setTitle('');
    setDate('');
    setDuration('');
    setImage('');
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.cardTitle}>Add New Workout</div>
      </div>
      <form onSubmit={handleAddWorkout} style={styles.addWorkoutForm}>
        <input
          type="text"
          placeholder="Workout Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.formInput}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.formInput}
          required
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={styles.formInput}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={styles.formInput}
        />
        <button type="submit" style={styles.button}>
          Add Workout
        </button>
      </form>
    </div>
  );
};

// Home Component
const Home = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [disableView, setDisableView] = useState(false);
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [pastWorkouts] = useState([
    { title: 'Morning Yoga', date: 'June 15, 2023 - 7:00 AM', duration: '60 mins', image: 'https://via.placeholder.com/400' },
    { title: 'HIIT Workout', date: 'July 10, 2023 - 6:00 PM', duration: '45 mins', image: 'https://via.placeholder.com/400' },
    { title: 'Strength Training', date: 'August 5, 2023 - 5:00 PM', duration: '60 mins', image: 'https://via.placeholder.com/400' },
  ]);

  const handleViewWorkout = (workout, listTitle) => {
    setSelectedWorkout(workout);
    setDisableView(listTitle === "Past Workouts");
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
  };

  const handleAddWorkout = (newWorkout) => {
    setMyWorkouts([...myWorkouts, newWorkout]);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={{ flex: 2 }}>
          <WorkoutList title="My Workouts" workouts={myWorkouts} onViewWorkout={handleViewWorkout} />
          <WorkoutList title="Past Workouts" workouts={pastWorkouts} onViewWorkout={handleViewWorkout} />
        </div>
        <div style={{ flex: 1 }}>
          <AddWorkout onAddWorkout={handleAddWorkout} />
        </div>
      </div>
      {selectedWorkout && (
        <Modal
          workout={selectedWorkout}
          onClose={handleCloseModal}
          disableView={disableView}
        />
      )}
    </div>
  );
};

export default Home;
