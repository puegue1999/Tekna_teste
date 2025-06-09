import type { ApplicationConfig } from '@angular/core';
import {
  inject,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  createUrlTreeFromSnapshot,
  PreloadAllModules,
  provideRouter,
  Router,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCloudinaryLoader } from '@angular/common';
import { TokenInterceptor } from './services/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling(),
      withViewTransitions({
        onViewTransitionCreated: ({ transition, to }) => {
          const router = inject(Router);
          const toTree = createUrlTreeFromSnapshot(to, []);
          // Skip the transition if the only thing changing is the fragment and queryParams
          if (
            router.isActive(toTree, {
              paths: 'exact',
              matrixParams: 'exact',
              fragment: 'ignored',
              queryParams: 'ignored',
            })
          ) {
            transition.skipTransition();
          }
        },
      }),
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideCloudinaryLoader('https://res.cloudinary.com/ismaestro/'),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
};
