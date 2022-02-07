import LTaskControl from '../ApiCon/LTaskControl';

test('test get task to api_server', () => {
  const ltaskC = new LTaskControl();
  ltaskC.getTasks();
});
