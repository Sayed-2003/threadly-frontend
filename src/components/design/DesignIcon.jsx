function DesignIcon({ name, size = 20, className = "" }) {
  const paths = {
    leaf: "M20 3c-8-1-15 3-15 10a6 6 0 0 0 6 6c7 0 10-8 9-16ZM4 21l11-11M8 16l-1-5M12 12l5 1",
    compass: "M16 8l-3 5-5 3 3-5 5-3ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
    home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1V10Z",
    users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M17 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    grid: "M3 3h7v7H3V3ZM14 3h7v7h-7V3ZM3 14h7v7H3v-7ZM14 14h7v7h-7v-7Z",
    bookmark: "M6 3h12a1 1 0 0 1 1 1v18l-7-4-7 4V4a1 1 0 0 1 1-1Z",
    plus: "M12 5v14M5 12h14",
    search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    arrowUp: "M7 17 17 7M7 7h10v10",
    chevron: "m7 10 5 5 5-5",
    heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    sprout: "M12 21v-9M5 21h14M12 16C4 16 2 12 3 7c6-1 9 3 9 9ZM12 12c0-7 3-10 9-9 1 6-3 9-9 9Z",
    message: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z",
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.leaf} />
    </svg>
  );
}

export default DesignIcon;
