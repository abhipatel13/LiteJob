import React from "react";
import { Button, Text } from "./..";

export default function SignUp1Rowbusiness({ client = "Client", business = "Business", ...props }) {
  return (
    <div {...props}>
      <div className="flex flex-row justify-center w-[39%] ml-1">
        <Text size="md" as="p" className="mx-[22px] !text-gray-400 text-center">
          {client}
        </Text>
      </div>
      <Button color="blue_600" size="md" className="mr-1 min-w-[116px] rounded">
        {business}
      </Button>
    </div>
  );
}
