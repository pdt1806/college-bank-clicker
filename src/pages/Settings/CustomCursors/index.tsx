import { FileButton, Group, Image, Stack, Table, Text, Title, Tooltip } from "@mantine/core";
import { useState } from "react";
import { updateCursor } from "../../../GameProvider/GameActions";

export const CustomCursorsSettings = () => {
  const [defaultCursor, setDefaultCursor] = useState<string>("/assets/cursors/default.png");
  const [pointerCursor, setPointerCursor] = useState<string>("/assets/cursors/pointer.png");

  const data = [
    {
      label: "Default",
      type: "default",
      image: defaultCursor,
    },
    {
      label: "Pointer",
      type: "pointer",
      image: pointerCursor,
    },
  ];

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Cursors settings
      </Title>
      <Text c="dimmed">You can customize the cursors used in the game with your own images.</Text>
      <Table verticalSpacing="sm" withRowBorders={false}>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.label}>
              <Table.Th p="0">
                <Title order={4} fw={400}>
                  {item.label}
                </Title>
              </Table.Th>
              <Table.Td w="70%">
                <Group gap="xl">
                  <FileButton
                    onChange={async (file) => {
                      if (!file) return;

                      const blob = await updateCursor(item.type, file);
                      console.log(blob);
                      if (!blob) return;

                      switch (item.type) {
                        case "default":
                          setDefaultCursor(blob);
                          break;
                        case "pointer":
                          setPointerCursor(blob);
                          break;
                      }
                    }}
                    accept="image/png,image/jpeg"
                    multiple={false}
                  >
                    {(props) => (
                      <Tooltip label="Click to change cursor" withArrow>
                        <Image
                          {...props}
                          src={item.image}
                          alt={item.label}
                          style={{ width: "50px", height: "50px" }}
                          {...(item.type == "pointer" && { className: "cursor-pointer" })}
                        />
                      </Tooltip>
                    )}
                  </FileButton>
                  {/* <Button disabled radius="xl">
                    Reset to default
                  </Button> */}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};
