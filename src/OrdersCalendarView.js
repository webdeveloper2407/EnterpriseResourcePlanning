import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Popup from 'reactjs-popup';

// Sample orders data with 'expectedDeliveryDate' field
const orders = [
  { id: 1, orderId: 'ORD001', expectedDeliveryDate: '2024-03-15', customerName: 'Customer 1', status: 'Pending' },
  { id: 2, orderId: 'ORD002', expectedDeliveryDate: '2024-03-19', customerName: 'Customer 2', status: 'Shipped' },
  { id: 3, orderId: 'ORD003', expectedDeliveryDate: '2024-03-15', customerName: 'Customer 3', status: 'Pending' },
  // Add more orders...
];

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🛒' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function OrdersCalendarView() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedDate(null);
    setPopupOpen(false);
  };

  // Filter orders based on selected date
  const ordersForSelectedDate = selectedDate
    ? orders.filter(order => dayjs(order.expectedDeliveryDate).isSame(selectedDate, 'day'))
    : [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={handleDateChange}
        defaultValue={null}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays: orders.map(order => dayjs(order.expectedDeliveryDate).date()),
          },
        }}
      />
      {selectedDate && (
        <Popup
          trigger={<button style={{ display: 'none' }}></button>}
          modal
          nested
          closeOnDocumentClick={false}
          open={popupOpen}
          onClose={handleClosePopup}
        >
          {close => (
            <div>
              <h2>Orders for {selectedDate.format('YYYY-MM-DD')}</h2>
              {ordersForSelectedDate.length > 0 ? (
                <ul>
                  {ordersForSelectedDate.map(order => (
                    <li key={order.id}>
                      <strong>Order ID:</strong> {order.orderId}<br />
                      <strong>Customer Name:</strong> {order.customerName}<br />
                      <strong>Status:</strong> {order.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders scheduled for this date.</p>
              )}
              <button onClick={close}>Close</button>
            </div>
          )}
        </Popup>
      )}
    </LocalizationProvider>
  );
}
