import { Text } from "./..";
import "./style.css";

export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center w-full mx-auto max-w-7xl">
        <Text size="xs" as="p">
          2024 LiteJob. All rights reserved.
        </Text>
        <div className="flex footer-md flex-row lg:justify-between gap-3 py-2 2xl:w-[30%] w-full">
          <div className="flex flex-row justify-center">
            <a href="#">
              <Text size="xs" as="p">
                Privacy Policy
              </Text>
            </a>
          </div>
          <div className="flex flex-row justify-center">
            <a href="#">
              <Text size="xs" as="p">
                Terms of Service
              </Text>
            </a>
          </div>
          <div className="flex flex-row justify-center">
            <a href="#">
              <Text size="xs" as="p">
                Cookies Settings
              </Text>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
