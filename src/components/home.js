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
    padding: '20px',
    boxSizing: 'border-box',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '10px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#1E3A8A',  // Blue color
    color: '#fff',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  button: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#1E3A8A',  // Blue color
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    border: '1px solid #1E3A8A',
    color: '#1E3A8A',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1E3A8A',
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
  eventCard: {
    display: 'flex',
    alignItems: 'start',
    gap: '16px',
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  eventImage: {
    borderRadius: '8px',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontWeight: '500',
  },
  eventDetails: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '8px',
  },
  cardHeader: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '10px',
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

const Modal = ({ onClose, onSubmit, initialData }) => {
  const [eventName, setEventName] = useState(initialData?.name || '');
  const [eventDate, setEventDate] = useState(initialData?.date || '');
  const [eventLocation, setEventLocation] = useState(initialData?.location || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...initialData, name: eventName, date: eventDate, location: eventLocation });
    onClose();
  };

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{initialData ? 'Edit Event' : 'Create Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Event Name</label>
            <input
              type="text"
              style={styles.formInput}
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Date</label>
            <input
              type="text"
              style={styles.formInput}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Location</label>
            <input
              type="text"
              style={styles.formInput}
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            {initialData ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

const EventCard = ({ title, date, location, image, onView, onDelete }) => {
  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  return (
    <div style={styles.eventCard}>
      <div className="flex-shrink-0">
        <img
          alt="Event Image"
          src={image || defaultImage}
          style={styles.eventImage}
        />
      </div>
      <div style={styles.eventInfo}>
        <div style={styles.eventTitle}>{title}</div>
        <div style={styles.eventDetails}>{date}</div>
        <div style={styles.eventDetails}>{location}</div>
        <button onClick={onView} style={{ ...styles.button, ...styles.buttonOutline }}>
          View
        </button>
        <button onClick={onDelete} style={{ ...styles.button, ...styles.buttonOutline, backgroundColor: '#ff474c', borderColor: '#ff474c', color: '#fff', marginLeft: '10px' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

const EventList = ({ title, events, onViewEvent, onDeleteEvent }) => {
  return (
    <div style={styles.column}>
      <div style={styles.cardHeader}>{title}</div>
      <div>
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.name}
            date={event.date}
            location={event.location}
            image={event.image}
            onView={() => onViewEvent(event)}
            onDelete={() => onDeleteEvent(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    { id: 1, name: 'Annual Gala Dinner', date: 'June 15, 2023 - 7:00 PM', location: 'Grand Ballroom, Acme Hotel', image: 'https://via.placeholder.com/400' },
    { id: 2, name: 'Summer Picnic', date: 'July 10, 2023 - 12:00 PM', location: 'Acme Park', image: 'https://via.placeholder.com/400' },
    // Add more events...
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, user } = useAuth();

  const handleCreateEvent = (event) => {
    // Simulate API call to create event
    const newEvent = { id: events.length + 1, ...event };
    setEvents([...events, newEvent]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    // Simulate API call to update event
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleDeleteEvent = (id) => {
    // Simulate API call to delete event
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div>Event Manager</div>
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
      <div style={styles.mainContent}>
        <div style={styles.column}>
          <button
            style={{ ...styles.button, ...styles.createButton }}
            onClick={() => setIsModalOpen(true)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.target.style.color = styles.buttonHover.color;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#1E3A8A';
              e.target.style.color = '#fff';
            }}
          >
            Create Event
          </button>
          <EventList title="Events" events={events} onViewEvent={handleViewEvent} onDeleteEvent={handleDeleteEvent} />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
          initialData={selectedEvent}
        />
      )}
    </div>
  );
};

export default Home;
