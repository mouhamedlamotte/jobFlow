type Props = {
  children: React.ReactNode;
};

export default function Code({ children }: Props) {
  return (
    <code className="bg-[#33342F] text-yellow-400 px-1 py-px rounded-sm">
      {children}
    </code>
  );
}
