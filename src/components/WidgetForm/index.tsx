import { useState } from "react";
import { CloseButton } from "../CloseButton";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg"
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;
  
export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handRestartFeedback(){
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handRestartFeedback} />
      ): (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType} 
              onFeedbackRestartRequested={handRestartFeedback}
              onFeedbackSent ={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-sm text-neutral-400">
      Estudo realizado com ♥ na <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
      </footer>
    </div>
  );
}