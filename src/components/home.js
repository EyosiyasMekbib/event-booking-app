import React, { useState } from 'react';

// CSS styles
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#2563eb',  // Less bright color
    color: '#fff',
    marginBottom: '20px',
    fontWeight: 'bold',  // Make the font bold
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
    padding: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  },
  cardHeader: {
    marginBottom: '16px',
    padding: '10px 5px',
    backgroundColor: 'white'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    position: 'static',
  },
  eventCard: {
    display: 'flex',
    alignItems: 'start',
    gap: '16px',
    marginBottom: '16px',
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
    marginBottom: '8px',  // Added margin-bottom for spacing
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
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
  },
};

// Navbar Component
const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <div>Event Manager</div>
      
    </div>
  );
};

// EventCard Component
const EventCard = ({ title, date, location, onView }) => {
  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  return (
    <div style={styles.eventCard}>
      <div className="flex-shrink-0">
        <img
          alt="Event Image"
          src={defaultImage}
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
      </div>
    </div>
  );
};

// EventList Component
const EventList = ({ title, events, onViewEvent }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.cardTitle}>{title}</div>
      </div>
      <div>
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            location={event.location}
            onView={() => onViewEvent(event, title)}
          />
        ))}
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ event, onClose, disableBuy }) => {
  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>{event.title}</h2>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <button style={styles.button} disabled={disableBuy}>
          Buy
        </button>
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [disableBuy, setDisableBuy] = useState(false);

  const events = [
    { title: 'Annual Gala Dinner', date: 'June 15, 2023 - 7:00 PM', location: 'Grand Ballroom, Acme Hotel' },
    { title: 'Summer Picnic', date: 'July 10, 2023 - 12:00 PM', location: 'Acme Park' },
    { title: 'Holiday Party', date: 'December 15, 2023 - 7:00 PM', location: 'Acme Ballroom' },
    { title: 'Company Retreat', date: 'August 1, 2023 - August 5, 2023', location: 'Acme Resort, Napa Valley' },
    { title: 'Charity Gala', date: 'November 10, 2023 - 6:00 PM', location: 'Acme Convention Center' },
    { title: 'Team Building Retreat', date: 'September 15, 2023 - September 17, 2023', location: 'Acme Retreat Center, Malibu' },
    { title: 'Spring Networking Event', date: 'April 20, 2023 - 6:00 PM', location: 'Acme Rooftop, San Francisco' },
    { title: 'Holiday Party 2022', date: 'December 10, 2022 - 7:00 PM', location: 'Acme Ballroom' },
    { title: 'Summer Picnic 2022', date: 'July 15, 2022 - 12:00 PM', location: 'Acme Park' }
  ];

  const handleViewEvent = (event, listTitle) => {
    setSelectedEvent(event);
    setDisableBuy(listTitle === "My Events" || listTitle === "Past Events");
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <EventList title="My Events" events={events} onViewEvent={handleViewEvent} />
        <EventList title="Current Bought" events={events} onViewEvent={handleViewEvent} />
        <EventList title="Past Events" events={events} onViewEvent={handleViewEvent} />
      </div>
      {selectedEvent && (
        <Modal
          event={selectedEvent}
          onClose={handleCloseModal}
          disableBuy={disableBuy}
        />
      )}
    </div>
  );
};

export default Home;
