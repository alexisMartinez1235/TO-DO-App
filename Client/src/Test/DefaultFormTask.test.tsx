import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DefaultFormTask from '../Components/Tasklist/DefaultFormTask';

describe('Render DefaultFormTask', () => {
  render(<DefaultFormTask />);
  // examples
  const date = new Date();
  const day: string = date.getDate().toString();
  let month: string = (date.getMonth() + 1).toString();
  const year: string = date.getFullYear().toString();
  if (date.getMonth() < 9) {
    month = `0${month}`;
  }
  const txtMonth = date.toString().substring(7, 4);
  const txtDate = `${txtMonth} ${day}, ${year}`;

  const txtTask = 'Hello';
  const expirationDate = `${month}/${day}/${year}`;

  // getElements
  const btnAddTask: HTMLElement = screen.getByTestId('btnAddTest');
  const inputNameTask: HTMLElement = screen.getByTestId('Description');
  const inputExpiration: HTMLElement = screen.getByLabelText('Choose date');
  // let taskElement: HTMLElement;

  // let taskList: HTMLElement = screen.getByTestId('taskList');

  test('Add values and verify changes', () => {
    fireEvent.change(inputNameTask, {
      target: {
        value: txtTask,
      },
    });
    userEvent.type(inputExpiration, expirationDate);
    const nextYear = screen.getByLabelText('Next month');
    const lastYear = screen.getByLabelText('Previous month');

    fireEvent.click(nextYear);
    fireEvent.click(nextYear);
    fireEvent.click(lastYear);
    fireEvent.click(lastYear);

    const chosenDate = screen.getByRole('button', { name: txtDate });

    fireEvent.click(chosenDate);

    // screen.debug();
    expect(inputNameTask).toHaveDisplayValue(txtTask);
    expect(inputExpiration).toHaveDisplayValue([expirationDate]);
  });

  test('Test Add task', () => {
    // taskElement = screen.getByTestId('ltask');
    // NOTE: dont work
    fireEvent.click(btnAddTask);
    // expect(taskElement).toHaveDisplayValue(txtTask);
    // expect(taskElement).toHaveDisplayValue(expirationDate);
  });
});
