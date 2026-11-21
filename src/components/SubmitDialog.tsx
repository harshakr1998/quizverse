import { useEffect, useRef } from 'react';
import { Check, PencilLine } from 'lucide-react';

type Props = { unanswered: number; onCancel: () => void; onConfirm: () => void };

export function SubmitDialog({ unanswered, onCancel, onConfirm }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const element = dialog.current; element?.showModal(); return () => { element?.close(); }; }, []);

  return <dialog ref={dialog} className="submit-dialog" aria-labelledby="submit-title" aria-describedby="submit-description" onCancel={event => { event.preventDefault(); onCancel(); }}>
    <div className="submit-dialog-icon" aria-hidden="true"><PencilLine size={25}/></div>
    <p className="submit-dialog-kicker">ONE LAST CHECK ✳</p>
    <h2 id="submit-title">Ready to submit?</h2>
    <p id="submit-description">{unanswered === 0 ? 'You’ve answered every question. Ready to see how you did?' : `You have ${unanswered} unanswered ${unanswered === 1 ? 'question' : 'questions'}. You can go back and answer them before submitting.`}</p>
    <div className="submit-dialog-actions"><button className="button secondary" autoFocus onClick={onCancel}>Keep practicing</button><button className="button primary" onClick={onConfirm}>Submit quiz <Check size={17}/></button></div>
  </dialog>;
}
