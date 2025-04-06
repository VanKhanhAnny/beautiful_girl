const PromptSuggestion = ({ icon, purpose, question }) => (
  <div className="flex-shrink-0 flex gap-2 p-4 pr-8 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-[#3498db] transition-colors">
    {icon}
    <div className="text-sm text-text-primary">
      {purpose}
      <div className="text-[#3498db]">{question}</div>
    </div>
  </div>
);

export default function PromptSuggestions() {
  return (
    <>
      <PromptSuggestion
        icon="⛅"
        purpose="I want to learn about health topics."
        question="Can you explain how to maintain a healthy diet?"
      />
      <PromptSuggestion
        icon="🏥"
        purpose="I need information about my medication."
        question="What are common side effects of blood pressure medication?"
      />
      <PromptSuggestion
        icon="🧠"
        purpose="I'm feeling anxious today."
        question="Can you suggest some relaxation techniques?"
      />
    </>
  );
}
