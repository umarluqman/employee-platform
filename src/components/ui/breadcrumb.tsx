import Link from "next/link";

interface nav {
  id: string;
  href: string;
  title: string;
  isCurrentPage: boolean;
}

export let Breadcrumb = ({ navList }: { navList: nav[] }) => {
  return (
    <nav className="flex mx-4 my-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {navList.map(({ title, href, isCurrentPage, id }, idx) => {
          return (
            <li
              className="flex items-center"
              key={id}
              aria-current={isCurrentPage && "page"}
            >
              {idx !== 0 ? (
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-zinc-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              ) : null}
              <Link
                href={href}
                className="inline-flex items-center text-sm font-medium text-zinc-700 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white"
              >
                {title}
              </Link>
            </li>
          );
        })}

        {/* <li>
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-zinc-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <a
              href="#"
              className="ms-1 text-sm font-medium text-zinc-700 hover:text-blue-600 md:ms-2 dark:text-zinc-400 dark:hover:text-white"
            >
              Projects
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-zinc-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="ms-1 text-sm font-medium text-zinc-500 md:ms-2 dark:text-zinc-400">
              Flowbite
            </span>
          </div>
        </li> */}
      </ol>
    </nav>
  );
};
