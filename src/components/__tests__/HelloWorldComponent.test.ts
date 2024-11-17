import { render, screen } from '@testing-library/vue';
import MyComponent from '../HelloWorld.vue';
import '@testing-library/jest-dom';

test('renders correctly', () => {
  render(MyComponent, { props: { msg: 'Hello World' } });
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});
