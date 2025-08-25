export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        These Terms of Service govern your use of MatchaTime. By using this
        application, you agree to the following conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Service</h2>
      <p className="mb-4">
        MatchaTime is provided as a student project and proof-of-concept.
        It is offered “as-is” without warranties or guarantees of performance.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You agree not to misuse the platform or attempt to compromise its integrity.</li>
        <li>You are responsible for the content you create and store in the application.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. AI Integration</h2>
      <p className="mb-4">
        AI features rely on third-party services (OpenRouter). Output may be
        inconsistent or inaccurate. You accept responsibility for reviewing and
        verifying any AI-generated content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        MatchaTime and its authors are not liable for any damages resulting
        from the use of this application. Use is entirely at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
      <p>
        These Terms may be updated as the project evolves. Continued use of
        the application constitutes acceptance of any updated terms.
      </p>
    </div>
  );
}
