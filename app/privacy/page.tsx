export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains what data is collected when using MatchaTime,
        how it is stored, and how it is used. As this is a student project, the system
        is intended as a proof-of-concept and not a production-ready secure service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Data Collected</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Notes, to-do lists, and attachments you create.</li>
        <li>Basic account information (e.g., email address).</li>
        <li>AI prompts and context sent to OpenRouter for processing.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Data</h2>
      <p className="mb-4">
        Your data is used only for providing the note-taking and productivity
        features, including AI-based summarization and generation. No data is
        shared with third parties beyond the AI service (OpenRouter).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Storage</h2>
      <p className="mb-4">
        Notes and files are stored securely using Convex and EdgeStore.
        AI requests may be temporarily logged by OpenRouter for service reliability.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. User Control</h2>
      <p className="mb-4">
        You may delete notes or files at any time. Deleted content will be
        removed from Convex and EdgeStore, though cached data may persist
        temporarily.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitations</h2>
      <p>
        This system is a student project and does not guarantee the same
        level of security or data protection as commercial-grade platforms.
        Please avoid storing sensitive or personal data.
      </p>
    </div>
  );
}
