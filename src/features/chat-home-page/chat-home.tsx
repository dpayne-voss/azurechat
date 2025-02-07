"use client";

import { AddExtension } from "@/features/extensions-page/add-extension/add-new-extension";
import { ExtensionCard } from "@/features/extensions-page/extension-card/extension-card";
import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { PersonaCard } from "@/features/persona-page/persona-card/persona-card";
import { PersonaModel } from "@/features/persona-page/persona-services/models";
import { AI_DESCRIPTION, AI_NAME } from "@/features/theme/theme-config";
import { Hero } from "@/features/ui/hero";
import { ScrollArea } from "@/features/ui/scroll-area";
import Image from "next/image";
import { FC } from "react";
import { NewChat } from "../chat-page/chat-menu/new-chat";
import { CreateChatAndRedirect } from "../chat-page/chat-services/chat-thread-service";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LoadingIndicator } from "../ui/loading";
import { MessageCircle, Plus } from "lucide-react";


interface ChatPersonaProps {
  personas: PersonaModel[];
  extensions: ExtensionModel[];
}

export const ChatHome: FC<ChatPersonaProps> = async (props) => {
    const { pending } = useFormStatus();
    return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col gap-6 pb-6">
        <Hero
          title={
            <>
              <Image
                src={"/ai-icon.png"}
                width={60}
                height={60}
                quality={100}
                alt="ai-icon"
              />{" "}
              {AI_NAME}
            </>
          }
          description={AI_DESCRIPTION}
        >
            <div className="col-span-3 space-y-4">
            <p className="text-muted-foreground">
                Click on the{" "}
                <strong style={{ color: "white" }}>New chat</strong>{" "}
                button to start a general conversation{" "}
                <strong style={{ color: "white" }}>OR</strong>{" "}
                select from the list of Personas below to start a
                conversation with an expert assistant.
            </p>
                <form action={CreateChatAndRedirect} className="flex gap-2 pr-3">
                    <Button
                        aria-disabled={pending}
                        size={"lg"}
                        className="flex gap-2 text-lg"
                        >
                        {pending ? <LoadingIndicator isLoading={pending} /> : <MessageCircle size={20} />}
                        New Chat
                    </Button>

                </form>
            </div>
        </Hero>
        <div className="container max-w-4xl flex gap-20 flex-col">
          {/* <div>
            <h2 className="text-2xl font-bold mb-3">Extensions</h2>

            {props.extensions && props.extensions.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {props.extensions.map((extension) => {
                  return (
                    <ExtensionCard
                      extension={extension}
                      key={extension.id}
                      showContextMenu={false}
                    />
                  );
                })}
              </div>
            ) :
              <p className="text-muted-foreground max-w-xl">No extentions created</p>
            }

          </div> */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Personas</h2>

            {props.personas && props.personas.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {props.personas.map((persona) => {
                  return (
                    <PersonaCard
                      persona={persona}
                      key={persona.id}
                      showContextMenu={false}
                    />
                  );
                })}
              </div>
            ) :
              <p className="text-muted-foreground max-w-xl">No personas created</p>
            }
          </div>
        </div>
        <AddExtension />
      </main>
    </ScrollArea>
  );
};
