export default function StepLine({ text }: { text: string }) {
  return (
    <div className="mx-5 my-10 md:mx-10 md:my-20 xl:mx-20">
      <svg
        viewBox="0 -28 320 36"
        className="w-full md:hidden"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 0 H 188 C 193 0 193 -22 198 -22 H 302 C 307 -22 307 0 312 0 H 320"
          stroke="#666"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <text
          x="250"
          y="-7"
          fontSize="13"
          fill="#333"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {text}
        </text>
      </svg>

      <svg
        viewBox="0 -0.6 13.4 0.8"
        className="hidden w-full md:block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 0 H 11.429 C 11.50 0 11.50 -0.316 11.594 -0.316 H 13.154 C 13.248 -0.316 13.248 0 13.319 0 H 13.4"
          stroke="#666"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <text
          x="12.374"
          y="-0.1"
          fontSize="0.16"
          fill="#333"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
