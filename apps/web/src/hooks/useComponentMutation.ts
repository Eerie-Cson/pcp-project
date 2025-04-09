import { DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';

type createComponentReturnType<Component> = {
  createComponent: (component: Component) => Promise<any>;
  loading: boolean;
  error: any;
};

/**
 * A hook to handle the creation of PC case components
 *
 * @param onSuccess - Optional callback function to run after successful creation
 * @returns An object containing the createCase function, loading state, and error
 */
// useComponentMutation.ts

export function useCreateComponent<Component>(
  mutation: DocumentNode,
): createComponentReturnType<Component> {
  const [mutateComponent, { loading, error }] = useMutation<Boolean, Component>(
    mutation,
    {
      context: { service: 'components' },
      onCompleted: () => {
        alert('✅ Component created!');
        window.location.reload();
      },
    },
  );

  useEffect(() => {
    if (error) {
      alert(`Server connection issue: ${error.message}`);
    }
  }, [error]);

  const createComponent = (variables: Component) => {
    return mutateComponent({ variables });
  };

  return { createComponent, loading, error };
}
