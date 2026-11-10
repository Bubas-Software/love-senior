import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t,r as n}from"./framework-jyvnLqbr.js";var r=e(t(),1),i=`Período diurno 12h/dia`,a=`Período noturno 12h/dia`,o=`24 horas`,s=`Personalizado`,c=`__custom__`,l=`__legacy__`,u=[i,a,o],d=[{value:i,label:i},{value:a,label:a},{value:o,label:o},{value:c,label:s}],f=1440,p=/^(\d{2}):(\d{2})$/,m=/^Personalizado\s*\(\s*((?:[01]\d|2[0-3]):[0-5]\d)\s*(?:–|-|às)\s*((?:[01]\d|2[0-3]):[0-5]\d)\s*\)$/u;function h(e){return u.some(t=>t===e)}function g(e){let t=p.exec(e);if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:n*60+r}function _(e,t){let n=g(e),r=g(t);if(n===null||r===null||n===r)return null;let i=r-n;return i>0?i:i+f}function v(e,t){let n=g(e),r=g(t);if(!e&&!t)return{valid:!1,message:`Informe a hora de início e a hora de fim.`,focus:`both`};if(n===null)return{valid:!1,message:`Informe uma hora de início válida, entre 00:00 e 23:59.`,focus:`start`};if(r===null)return{valid:!1,message:`Informe uma hora de fim válida, entre 00:00 e 23:59.`,focus:`end`};if(n===r)return{valid:!1,message:`A hora de fim deve ser diferente da hora de início.`,focus:`both`};let i=r-n;return{valid:!0,durationMinutes:i>0?i:i+f}}function y(e){if(!Number.isInteger(e)||e<0)throw RangeError(`A duração deve ser um número inteiro de minutos não negativo.`);let t=Math.floor(e/60),n=e%60,r=[];return t>0&&r.push(`${t} ${t===1?`hora`:`horas`}`),(n>0||t===0)&&r.push(`${n} ${n===1?`minuto`:`minutos`}`),r.join(` e `)}function b(e){return v(e.start,e.end).valid?`${s} (${e.start}–${e.end})`:null}function x(e){if(e==null||e.trim()===``)return{kind:`empty`,value:null};let t=e.trim();if(h(t))return{kind:`standard`,value:t};let n=m.exec(t);if(n){let t={start:n[1],end:n[2]};if(v(t.start,t.end).valid)return{kind:`custom`,value:e,schedule:t}}return{kind:`legacy`,value:e}}function S(e,t){let n=x(e);return n.kind===`custom`?{selection:c,storedValue:n.value,customSchedule:n.schedule,legacyValue:null}:n.kind===`standard`?{selection:n.value,storedValue:n.value,customSchedule:null,legacyValue:null}:n.kind===`legacy`&&t?{selection:l,storedValue:n.value,customSchedule:null,legacyValue:n.value}:{selection:i,storedValue:i,customSchedule:null,legacyValue:null}}var C=n(),w={start:``,end:``};function T(e,t,n){let r=n.currentTarget.value;e(e=>({...e,[t]:r}))}function E({name:e=`care_level`,initialValue:t,preserveLegacy:n=!1,id:i}){let a=(0,r.useId)().replace(/:/g,``),o=i||`care-plan-${a}`,s=`${e}_option`,l=`${o}-help`,u=`${o}-dialog`,f=`${u}-title`,p=`${u}-description`,m=`${u}-error`,g=`${u}-duration`,x=`${u}-start`,E=`${u}-end`,[D]=(0,r.useState)(()=>S(t,n)),[O,k]=(0,r.useState)(D.selection),[A,j]=(0,r.useState)(D.storedValue),[M,N]=(0,r.useState)(D.customSchedule),[P,F]=(0,r.useState)(D.customSchedule||w),[I,L]=(0,r.useState)(null),[R,z]=(0,r.useState)(!1),B=(0,r.useRef)(null),V=(0,r.useRef)(null),H=(0,r.useRef)(null),U=(0,r.useRef)(null),W=(0,r.useRef)(D.selection),G=(0,r.useRef)(D.storedValue),K=M?_(M.start,M.end):null,q=_(P.start,P.end);(0,r.useEffect)(()=>{if(!R)return;let e=B.current;if(e)return e.open||e.showModal(),V.current?.focus(),()=>{e.open&&e.close(),U.current?.focus()}},[R]);function J(e){W.current=O,G.current=A,U.current=e,F(M||w),L(null),k(c),z(!0)}function Y(e){let t=e.currentTarget.value;if(t===`__custom__`){J(e.currentTarget);return}if(t===`__legacy__`&&D.legacyValue!==null){k(t),j(D.legacyValue);return}h(t)&&(k(t),j(t))}function X(){k(W.current),j(G.current),L(null),z(!1)}function Z(){let e=v(P.start,P.end);if(!e.valid){L(e.message),e.focus===`end`?H.current?.focus():V.current?.focus();return}let t=b(P);if(t===null){L(`Informe um intervalo válido para salvar o horário personalizado.`),V.current?.focus();return}N({...P}),j(t),k(c),L(null),z(!1)}function Q(e,t){T(F,e,t),I&&L(null)}function $(e){e.key===`Enter`&&e.target instanceof HTMLInputElement&&(e.preventDefault(),Z())}return(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`label`,{htmlFor:o,className:`block text-xs font-medium text-[var(--muted)] mb-1`,children:`Plano de cuidado`}),(0,C.jsxs)(`select`,{id:o,name:s,value:O,onChange:Y,"aria-describedby":l,className:`input`,children:[d.map(e=>(0,C.jsx)(`option`,{value:e.value,children:e.label},e.value)),D.legacyValue!==null&&(0,C.jsxs)(`option`,{value:`__legacy__`,children:[`Valor anterior: `,D.legacyValue]})]}),(0,C.jsx)(`input`,{type:`hidden`,name:e,value:A}),O===`__custom__`&&M&&K!==null?(0,C.jsxs)(`div`,{id:l,className:`schedule-summary`,children:[(0,C.jsxs)(`p`,{children:[`Horário: `,(0,C.jsxs)(`strong`,{children:[M.start,`–`,M.end]})]}),(0,C.jsxs)(`p`,{children:[`Total: `,(0,C.jsx)(`strong`,{className:`duration`,children:y(K)})]}),(0,C.jsx)(`button`,{type:`button`,onClick:e=>J(e.currentTarget),className:`edit-schedule-button`,children:`Editar horário`})]}):O===`__legacy__`?(0,C.jsx)(`p`,{id:l,className:`field-help`,children:`Este valor anterior será mantido até que você escolha outro plano.`}):(0,C.jsx)(`p`,{id:l,className:`field-help`,children:`Ao escolher Personalizado, informe o intervalo diário de atendimento.`}),R&&(0,C.jsx)(`dialog`,{ref:B,id:u,"aria-modal":`true`,"aria-labelledby":f,"aria-describedby":p,className:`care-plan-dialog`,onCancel:e=>{e.preventDefault(),X()},onClick:e=>{e.target===e.currentTarget&&X()},onKeyDown:$,children:(0,C.jsxs)(`div`,{className:`dialog-content`,children:[(0,C.jsx)(`header`,{className:`dialog-header`,children:(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`h2`,{id:f,children:`Definir horário personalizado`}),(0,C.jsx)(`p`,{id:p,children:`Informe as horas de início e fim. Se a hora de fim for menor, o período continuará após a meia-noite.`})]})}),(0,C.jsxs)(`div`,{className:`time-grid`,children:[(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`label`,{htmlFor:x,className:`dialog-label`,children:`Hora de início`}),(0,C.jsx)(`input`,{ref:V,id:x,type:`time`,step:`60`,value:P.start,onChange:e=>Q(`start`,e),required:!0,"aria-invalid":I?`true`:void 0,"aria-describedby":`${p} ${I?m:g}`,className:`input`})]}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`label`,{htmlFor:E,className:`dialog-label`,children:`Hora de fim`}),(0,C.jsx)(`input`,{ref:H,id:E,type:`time`,step:`60`,value:P.end,onChange:e=>Q(`end`,e),required:!0,"aria-invalid":I?`true`:void 0,"aria-describedby":`${p} ${I?m:g}`,className:`input`})]})]}),(0,C.jsx)(`p`,{id:m,role:`alert`,className:I?`validation-error`:`validation-error empty`,children:I||``}),(0,C.jsx)(`p`,{id:g,role:`status`,"aria-live":`polite`,className:`duration-summary`,children:q===null?`Informe horários diferentes para calcular o total.`:(0,C.jsxs)(C.Fragment,{children:[`Total: `,(0,C.jsx)(`strong`,{className:`duration`,children:y(q)})]})}),(0,C.jsxs)(`div`,{className:`dialog-actions`,children:[(0,C.jsx)(`button`,{type:`button`,onClick:X,className:`secondary-action`,children:`Cancelar`}),(0,C.jsx)(`button`,{type:`button`,onClick:Z,className:`primary-action`,children:`Salvar horário`})]})]})}),(0,C.jsx)(`style`,{jsx:!0,children:`
        .input {
          width: 100%;
          min-height: 2.75rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border);
          background: white;
          padding: 0.625rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          color: var(--foreground);
        }

        .input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px var(--brand-light);
        }

        .field-help,
        .schedule-summary {
          margin-top: 0.4rem;
          color: var(--muted-2);
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .schedule-summary {
          display: grid;
          gap: 0.15rem;
          color: var(--muted);
        }

        .schedule-summary p {
          margin: 0;
        }

        .duration {
          font-variant-numeric: tabular-nums;
        }

        .edit-schedule-button {
          justify-self: start;
          min-height: 2.5rem;
          margin-top: 0.25rem;
          padding: 0.25rem 0;
          color: var(--brand-dark);
          font-size: 0.75rem;
          font-weight: 600;
          text-decoration: underline;
          text-underline-position: from-font;
        }

        .care-plan-dialog {
          width: min(32rem, calc(100vw - 2rem));
          max-height: calc(100vh - 2rem);
          margin: auto;
          padding: 0;
          overflow: auto;
          overscroll-behavior: contain;
          border: 1px solid var(--border);
          border-radius: 1rem;
          background: var(--surface);
          color: var(--foreground);
          box-shadow: 0 1.5rem 4rem rgba(20, 63, 58, 0.2);
        }

        :global(.care-plan-dialog::backdrop) {
          background: rgba(9, 13, 12, 0.42);
        }

        .dialog-content {
          padding: 1.5rem;
        }

        .dialog-header h2 {
          margin: 0;
          color: var(--foreground);
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .dialog-header p {
          max-width: 34rem;
          margin: 0.5rem 0 0;
          color: var(--muted);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .time-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1.25rem;
        }

        .dialog-label {
          display: block;
          margin-bottom: 0.4rem;
          color: var(--foreground);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .validation-error {
          min-height: 1.5rem;
          margin: 0.5rem 0 0;
          color: var(--status-critical);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .validation-error.empty {
          visibility: hidden;
        }

        .duration-summary {
          margin: 0.75rem 0 0;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          background: var(--brand-light);
          color: var(--brand-deep);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .dialog-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .secondary-action,
        .primary-action {
          min-height: 2.75rem;
          border-radius: 0.5rem;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .secondary-action {
          border: 1px solid var(--border);
          color: var(--foreground);
        }

        .secondary-action:hover {
          background: rgba(9, 13, 12, 0.03);
        }

        .primary-action {
          background: var(--brand);
          color: white;
        }

        .primary-action:hover {
          background: var(--brand-dark);
        }

        @media (max-width: 32rem) {
          .dialog-content {
            padding: 1.25rem;
          }

          .time-grid {
            grid-template-columns: 1fr;
          }

          .dialog-actions {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .secondary-action,
          .primary-action {
            width: 100%;
          }
        }
      `})]})}export{E as t};