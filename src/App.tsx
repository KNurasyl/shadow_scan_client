import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { AuthHydrationGate } from './core/AuthHydrationGate';
import { queryClient } from './queryClient';
import { router } from './router';

function App() {
  return (
    <AuthHydrationGate>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthHydrationGate>
  );
}

export default App;
