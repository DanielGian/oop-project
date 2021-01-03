import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider
} from "@material-ui/core";
import dateFns from "date-fns";
import React from "react";
import { EventList } from "../list/EventList";
import "./Calendar.css";

let event = new EventList();

class Calendar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      event: this.props.event,
      loaded: false,
      open: false,
      details: event
    };
  }

  logProps = () => {
    var dates = [""];
    var months = [""];
    var eventDates = ["01-02-03"];
    this.state.event.get().map(item => eventDates.push(item.day));
    //Parses the times so they can be compared to the calendar dates
    eventDates.map(element => {
      let pieces = element.split("-");
      dates.push(pieces[2]);
      months.push(pieces[1]);
    });
    dates.splice(0, 2);
    months.splice(0, 2);
    let newEvent = {};
    this.state.event.get().map(
      (display, index) => (
        (newEvent = {
          name: display.name,
          day: dates[index],
          months: months[index],
          id: display.id,
          uri: display.uri,
          location: display.location,
          type: display.type,
          venue: display.venue,
          performance: display.performance
        }),
        //adds newly formatted times to the event list
        event.add(newEvent)
      )
    );
    this.setState({ event: event });
    this.setState({ loaded: true });
  };

  //Renders Current Month along with buttons to change to next or previous month
  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [<div />];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  //renders the individual boxes for the days
  renderCells() {
    const { currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [<div />];

    let days = [<div />];
    let day = startDate;
    let formattedDate = "";
    const monthFormat = "MM";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        let stringDate = dateFns.parse(cloneDay).toString();
        let splitDate = stringDate.split(" ");
        splitDate[1] = dateFns.format(this.state.currentMonth, monthFormat);
        days.push(
          <div className={`col cell`} key={cloneDay.toString()}>
            <span className="number">
              {//Maps through events to find which ones are on this paricular date
              this.state.event
                .get()
                .map(item =>
                  item.day == splitDate[2] && item.months == splitDate[1] ? (
                    <Button
                      onClick={() => this.onDateClick(splitDate[2], item)}
                    >
                      {item.name}
                    </Button>
                  ) : null
                )}
              {formattedDate}
            </span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div key={day.toString() + "row"} className="row">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  //Opens dialog box to display the specific dates event details
  onDateClick = (date, item) => {
    this.setState({ details: item });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //Sets header to next month
  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  //Sets header to prev month
  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.state.loaded ? null : ( //waits for event data to be loaded before rendering the button
          <Button onClick={this.logProps}>Load Events</Button>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.details.type}
          </DialogTitle>
          <DialogContent>
            {this.state.details.name}
            <div />
            <a
              href={this.state.details.uri}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {this.state.details.uri}
            </a>
          </DialogContent>
        </Dialog>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        <Divider />
        <div>
          <Button />
        </div>
        <div>
          <Button />
        </div>
      </div>
    );
  }
}

export default Calendar;
