interface Window {
  __annotate?: {
    draw: (marks: Mark[], options?: Options) => Rect;
    clear: () => void;
  };
}
