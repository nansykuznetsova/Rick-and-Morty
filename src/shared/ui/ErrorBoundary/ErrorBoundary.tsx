import { Component, type ReactNode } from 'react';

import { Layout } from '@/shared';

import './ErrorBoundary.scss';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    return (
      <>
        {this.state.hasError
          ? this.props.fallback || (
              <Layout>
                <div className='error-page'>
                  <h1 className='error-page__title'>Oops! 🧨</h1>
                  <p className='error-page__text'>Something went wrong.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className='error-page__btn'
                  >
                    Reload page
                  </button>
                </div>
              </Layout>
            )
          : this.props.children}
      </>
    );
  }
}
