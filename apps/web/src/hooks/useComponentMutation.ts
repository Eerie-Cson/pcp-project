import { DocumentNode, useMutation } from '@apollo/client';
import { CREATE_CASE } from '../graphql/component/mutation/create-component.mutation';
import { ObjectId, ObjectTypes } from '@pcp/object-id';
import {
  Case,
  CaseType,
  ComponentType,
  SidePanelType,
} from '../libs/graphql-types/component';

type CreateCaseInput = {
  name: string;
  brand: string;
  price: string;
  partNumber: string;
  specs: {
    color: string;
    formFactor: string;
    interface: string;
    [key: string]: any;
  };
};

type CreateCaseResponse = {
  createCase: (component: CreateCaseInput) => Promise<void>;
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
export const useCreateComponent = (mutation: DocumentNode) => {
  const [mutateComponent, { loading, error }] = useMutation(mutation, {
    context: { service: 'components' },
    onCompleted: () => {
      alert('✅ Component created!');
      window.location.reload();
    },
  });

  const createComponent = (variables: any) => {
    console.log(variables);
    return mutateComponent(variables);
  };

  return { createComponent, loading, error };
};
