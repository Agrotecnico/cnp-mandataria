import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

let DropdownContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

export default function Dropdown({ children }: { children: ReactNode }) {
  let [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
        {children}
      </RadixDropdownMenu.Root>
    </DropdownContext.Provider>
  );
}

function DropdownButton({ children }: { children: ReactNode }) {
  return (
    <RadixDropdownMenu.Trigger className="group cursor-pointer select-none rounded p-2 text-2xl ">
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

Dropdown.Button = DropdownButton;

let DropdownMenuContext = createContext({ closeMenu: () => {} });

function DropdownMenu({ children }: { children: ReactNode }) {
  let { open, setOpen } = useContext(DropdownContext);
  let controls = useAnimationControls();

  async function closeMenu() {
    await controls.start("closed");
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      controls.start("open");
    }
  }, [controls, open]);

  return (
    <DropdownMenuContext.Provider value={{ closeMenu }}>
      <AnimatePresence>
        {open && (
          <RadixDropdownMenu.Portal forceMount>
            <RadixDropdownMenu.Content
              align="start"
              className="!opacity-100 mt-1 overflow-hidden rounded-b-lg bg-white text-left shadow-xl shadow-[#020b1d22] md:mt-4"
              asChild
            >
              <motion.div
                initial="closed"
                animate={controls}
                exit="closed"
                variants={{
                  open: {
                    opacity: 1,
                    transition: { ease: "easeOut", duration: 0.1 },
                  },
                  closed: {
                    opacity: 0,
                    transition: { ease: "easeIn", duration: 0 },
                  },
                }}
              >
                {children}
              </motion.div>
            </RadixDropdownMenu.Content>
          </RadixDropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenuContext.Provider>
  );
}

Dropdown.Menu = DropdownMenu;

function DropdownMenuItem({
  children,
  onSelect = () => {},
}: {
  children: ReactNode;
  onSelect?: () => void;
}) {
  let controls = useAnimationControls();
  let { closeMenu } = useContext(DropdownMenuContext);

  return (
    <RadixDropdownMenu.Item
      onSelect={async (e) => {
        e.preventDefault();

        await controls.start({
          backgroundColor: "#fff",
          color: "#1d0215",/* "#000" */
          transition: { duration: 0.0 },/* 0.04 */
        });
        await controls.start({
          backgroundColor: "#fff" ,/* "#38bdf8" */
          color: "#1d0215",/* "#fff" */
          transition: { duration: 0.0 },/* 0.04 */
        });
        await sleep(0.075);

        await closeMenu();
        onSelect();
      }}
      className="w-full select-none rounded data-[highlighted]:focus:outline-none"
      asChild
    >
      <motion.div animate={controls}>{children}</motion.div>
    </RadixDropdownMenu.Item>
  );
}

Dropdown.MenuItem = DropdownMenuItem;

const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));