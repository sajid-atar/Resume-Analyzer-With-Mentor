"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, Paperclip, FileText, Image, X } from "lucide-react"

interface Mentor {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  status: string
}

interface Message {
  id: string
  sender: "user" | "mentor"
  text: string
  timestamp: Date
  attachments?: Array<{
    type: "resume" | "image"
    name: string
    url: string
  }>
}

export function ChatInterface({ mentor }: { mentor: Mentor }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "mentor",
      text: `Hi there! I'm ${mentor.name}, ${mentor.role} at ${mentor.company}. I'm here to help you with your resume and job search. How can I assist you today?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [attachments, setAttachments] = useState<
    Array<{
      type: "resume" | "image"
      name: string
      url: string
    }>
  >([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && attachments.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setAttachments([])

    // Simulate mentor response after a delay
    setTimeout(() => {
      const mentorResponses = [
        "That's a great question! Based on your resume, I'd recommend highlighting your project management experience more prominently.",
        "I noticed your resume could use more quantifiable achievements. Try to include metrics that showcase your impact.",
        "Your skills section is strong, but I'd suggest reorganizing it to prioritize the most relevant skills for the jobs you're targeting.",
        "Have you considered adding a brief professional summary at the top? It can help recruiters quickly understand your value proposition.",
        "For technical roles, I'd recommend creating a separate section for your technical skills and projects.",
      ]

      const randomResponse = mentorResponses[Math.floor(Math.random() * mentorResponses.length)]

      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "mentor",
        text: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, mentorMessage])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const isResume = file.name.endsWith(".pdf") || file.name.endsWith(".docx")

      setAttachments([
        ...attachments,
        {
          type: isResume ? "resume" : "image",
          name: file.name,
          url: "/placeholder.svg?height=100&width=100", // In a real app, you would upload the file and get a URL
        },
      ])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 h-[calc(100vh-72px)] flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-xl shadow-sm p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mb-2 space-y-2">
                    {message.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-2 rounded ${
                          message.sender === "user" ? "bg-purple-700" : "bg-gray-200"
                        }`}
                      >
                        {attachment.type === "resume" ? (
                          <FileText
                            className={`h-5 w-5 mr-2 ${message.sender === "user" ? "text-white" : "text-gray-600"}`}
                          />
                        ) : (
                          <Image
                            className={`h-5 w-5 mr-2 ${message.sender === "user" ? "text-white" : "text-gray-600"}`}
                          />
                        )}
                        <span className={`text-sm ${message.sender === "user" ? "text-white" : "text-gray-700"}`}>
                          {attachment.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <p>{message.text}</p>
                <div className={`text-xs mt-1 ${message.sender === "user" ? "text-purple-200" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="bg-white rounded-lg p-2 mb-2 flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="bg-gray-100 rounded flex items-center p-2 pr-1">
              {attachment.type === "resume" ? (
                <FileText className="h-4 w-4 mr-1 text-gray-600" />
              ) : (
                <Image className="h-4 w-4 mr-1 text-gray-600" />
              )}
              <span className="text-sm text-gray-700 mr-1">{attachment.name}</span>
              <button onClick={() => removeAttachment(index)} className="text-gray-500 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white rounded-xl shadow-sm p-3 flex items-end">
        <button className="text-gray-500 hover:text-gray-700 p-2" onClick={handleAttachmentClick}>
          <Paperclip className="h-5 w-5" />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.docx,.jpg,.jpeg,.png"
          />
        </button>
        <textarea
          className="flex-1 border-0 focus:ring-0 resize-none p-2 max-h-32"
          placeholder="Type your message..."
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button className="bg-purple-600 hover:bg-purple-700 text-white ml-2" onClick={handleSendMessage}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

