import { Box, Container, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { UNIFORMED_HEIGHT } from "../../utils/const";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const isMobile = useMediaQuery("(max-width: 75em)");

  return (
    <Box py={{ base: 0, lg: "xs" }} c="white" h={isMobile ? UNIFORMED_HEIGHT : "100vh"}>
      <ScrollArea.Autosize h="100%">
        <Container size="xl" py={{ base: "xs", lg: 0 }}>
          {children}
        </Container>
      </ScrollArea.Autosize>
    </Box>
  );
};

export default PageWrapper;
