"use client";

import { GearIcon } from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Dialog,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Select,
  Slider,
  Text,
  TextArea,
  Box,
  ScrollArea,
  Separator,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useRef } from "react";
import ChatMessage from "./components/ChatMessage";

type Slider = {
  id: string;
  label: string;
};

const sliders: Slider[] = [
  { id: "harassment", label: "Harassment" },
  { id: "hate", label: "Hate" },
  { id: "sexuallyExplicit", label: "Sexually Explicit" },
  { id: "dangerousContent", label: "Dangerous Content" },
  { id: "civicIntegrity", label: "Civic Integrity" },
];

export default function Home() {
  const [sliderValue, setSliderValue] = React.useState([0.5]);
  const [systemPrompt, setSystemPrompt] = React.useState(
    "You are a helpful assistant."
  );
  const [reactionPrompt, setReactionPrompt] = React.useState(
    "You are a helpful assistant. Be creative."
  );
  const [sliderValues, setSliderValues] = React.useState<
    Record<string, number>
  >(
    sliders.reduce((acc, slider) => {
      acc[slider.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<string[]>([]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Flex
        width={"100%"}
        maxWidth={"600px"}
        mx={"auto"}
        gap={"3"}
        direction={"column"}
        p={"4"}
        style={{ height: "100vh" }}
      >
        <Flex gap={"3"} direction={"row"} wrap={"wrap"} justify={"between"}>
          <Select.Root defaultValue="agent1">
            <Select.Trigger className="hover-scale press-effect animate-scale" />
            <Select.Content>
              <Select.Item value="agent1">Agent 1</Select.Item>
              <Select.Item value="agent2">Agent 2</Select.Item>
              <Select.Item value="agent3">Agent 3</Select.Item>
            </Select.Content>
          </Select.Root>
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton
                variant="outline"
                className="hover-scale press-effect animate-scale"
              >
                <GearIcon />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Content
              maxWidth={"350px"}
              style={{ animation: "scaleIn 0.2s ease-out" }}
            >
              <Dialog.Title>Adjust options</Dialog.Title>
              <Dialog.Description>
                Here you can adjust AI settings and all available bot options.
              </Dialog.Description>
              <Flex direction="column" gap="3" mt="4">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Temperature
                  </Text>
                  <Slider
                    defaultValue={[0.5]}
                    value={sliderValue}
                    max={2}
                    step={0.01}
                    min={0}
                    onValueChange={(value) => setSliderValue(value)}
                  ></Slider>
                  <Text>{sliderValue[0].toFixed(2)}</Text>
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    System prompt
                  </Text>
                  <TextArea
                    placeholder="You are a helpful assistant."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    System prompt for reactions
                  </Text>
                  <TextArea
                    placeholder="You are a helpful assistant. Be creative."
                    value={reactionPrompt}
                    onChange={(e) => setReactionPrompt(e.target.value)}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Model
                  </Text>
                  <Select.Root defaultValue="flash-1.5">
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="flash-1.5">
                        Gemini Flash 1.5
                      </Select.Item>
                      <Select.Item value="flash-2.0">
                        Gemini Flash 2.0
                      </Select.Item>
                      <Select.Item value="pro-2.0">Gemini Pro 2.0</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </label>

                <Card className="animate-scale">
                  <Flex gap="3" direction="column">
                    <Heading size="2" mb="2">
                      Security options
                    </Heading>
                    {sliders.map((slider) => (
                      <label key={slider.id}>
                        <Text as="div" size="2" mb="1" weight="bold">
                          {slider.label}
                        </Text>
                        <Slider
                          defaultValue={[1]}
                          value={
                            sliderValues[slider.id] !== undefined
                              ? [sliderValues[slider.id]]
                              : [1]
                          }
                          max={3}
                          step={1}
                          min={0}
                          onValueChange={(value) =>
                            setSliderValues((prev) => ({
                              ...prev,
                              [slider.id]: value[0],
                            }))
                          }
                        ></Slider>
                        <Text size="1" mt="2">
                          {[
                            "Block none",
                            "Block few",
                            "Block some",
                            "Block most",
                          ][sliderValues[slider.id]] || "Undefined"}
                        </Text>
                      </label>
                    ))}
                  </Flex>
                </Card>
              </Flex>
              <Flex gap={"2"} justify={"end"} mt={"4"}>
                <Dialog.Close>
                  <Button variant="soft">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
        <Flex flexGrow={"1"} direction={"column"} style={{ minHeight: 0 }}>
          <Card style={{ height: "100%" }} className="animate-scale">
            <Flex direction={"column"} style={{ height: "100%" }}>
              <Heading size={"2"}>Chat</Heading>
              <Separator style={{ width: "100%" }} mt={"2"} mb={"2"} />
              <ScrollArea
                type="always"
                scrollbars="vertical"
                style={{ flex: 1, minHeight: 0 }}
              >
                <style jsx global>{`
                  @keyframes slideIn {
                    from {
                      transform: translateY(20px);
                    }
                    to {
                      transform: translateY(0);
                    }
                  }
                  @keyframes fadeIn {
                    to {
                      opacity: 1;
                    }
                  }
                  /* Add new animations */
                  @keyframes scaleIn {
                    from {
                      transform: scale(0.5);
                      opacity: 0;
                      filter: blur(10px);
                    }
                    to {
                      transform: scale(1);
                      opacity: 1;
                      filter: none;
                    }
                  }

                  /* Add transition classes */
                  .animate-scale {
                    animation: scaleIn 0.8s ease-out;
                  }

                  .hover-scale {
                    transition: transform 0.2s ease;
                  }
                  .hover-scale:hover {
                    transform: scale(1.1);
                  }

                  .hover-lift {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                  }
                  .hover-lift:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px var(--gray-a4);
                  }

                  .press-effect {
                    transition: transform 0.1s ease;
                  }
                  .press-effect:active {
                    transform: scale(0.97);
                  }
                `}</style>
                <Flex
                  gap={"3"}
                  direction={"column"}
                  p={"4"}
                  ref={scrollAreaRef}
                >
                  <ChatMessage message={"Hello!"} isOutgoing={true} />
                  <ChatMessage message={"Hi!"} isOutgoing={false} />
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={message}
                      isOutgoing={true}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </Flex>
              </ScrollArea>
            </Flex>
          </Card>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (message.trim()) {
                setMessages((prev) => [...prev, message]);
                setMessage("");
              }
            }}
          >
            <Flex gap="3" p="4">
              <Box width={"100%"}>
                <TextField.Root
                  className="animate-scale hover-lift"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Box>
              <Button
                type="submit"
                className="hover-scale animate-scale press-effect"
              >
                Send
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
