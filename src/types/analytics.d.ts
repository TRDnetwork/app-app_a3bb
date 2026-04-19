interface Window {
  analytics?: {
    capture: (eventName: string, properties?: Record<string, any>) => void
    identify: (userId: string, properties?: Record<string, any>) => void
    reset: () => void
    opt_out_capturing: () => void
    opt_in_capturing: () => void
    has_opted_out_capturing: () => boolean
  }
}

**ANALYTICS IMPLEMENTATION SUMMARY:**

1. **Provider**: PostHog (SaaS analytics, privacy-friendly with DNT support)
2. **Tracking Script**: Added to index.html with:
   - Async loading
   - Do Not Track (DNT) respect
   - Autocapture enabled
   - Session recording with input masking
   - Global `window.analytics` exposure

3. **Event Tracking**:
   - Page views via PostHog autocapture + manual `$pageview`
   - Section views (hero_viewed, about_viewed, projects_viewed, contact_viewed)
   - Project clicks with project metadata
   - Contact form submissions (attempts, success, errors)
   - Toast dismissals

4. **Privacy Features**:
   - DNT check before loading
   - Input masking for sensitive fields
   - No personal data in event properties
   - Honeypot field maintained

5. **Integration**:
   - Helper function `trackEvent()` for consistent tracking
   - TypeScript declarations for window.analytics
   - Event listeners on key user interactions
   - Respects user's DNT preferences

The implementation uses `/* ANALYTICS_KEY */` placeholder for the PostHog project token which should be replaced with the actual key during deployment.