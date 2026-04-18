import { Component, type ReactNode } from 'react';
import { Translation } from 'react-i18next';

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
                <Translation>
                  {(t) => (
                    <div className='error-page'>
                      <h1 className='error-page__title'>{t('errors.oops')}</h1>
                      <p className='error-page__text'>
                        {t('errors.somethingWentWrong')}
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className='error-page__btn'
                      >
                        {t('actions.reloadPage')}
                      </button>
                    </div>
                  )}
                </Translation>
              </Layout>
            )
          : this.props.children}
      </>
    );
  }
}
