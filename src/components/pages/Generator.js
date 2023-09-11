"use client";
import Select from "@/components/ui/Select";
import toast from "@/components/ui/Toast";
import Button from "@/components/basic/Button";
import Switch from "@/components/basic/Switch";
import Textarea from "@/components/basic/Textarea";
import MutipleSelct from "@/components/basic/Select";
import Radio from "@/components/basic/Radio";
import { courierPrime } from "@/lib/fonts";
import { Tooltip } from "@/ui/material-tailwind";
import { cn, copyToClipboard } from "@/lib/utils";
import { useState } from "react";
import request from "@/lib/request";
import {
  SCHEMA_PLACEHOLDER,
  PROMPT_LABEL,
  PROMPT_PLACEHOLDER,
  RESULT_LABEL,
  RESULT_PLACEHOLDER,
  DAILY_LIMIT_GENSQL,
  TOTAL_LIMIT_GENSQL,
  DANGER_DAILY_LIMIT_GENSQL,
  DANGER_TOTAL_LIMIT_GENSQL,
  RADIO_OPTIONS,
  ADD_TABLE_BY_SELECT,
} from "@/const/generator";
import { RED, BLUE } from "@/const/colors";
import useAnalytics from "@/hooks/useAnalytics";
import useUserStore from "@/store/user";

export const metadata = {
  title: "GuruSQL - SQL Generator",
  description:
    "GuruSQL gives the power to craft efficient, accurate SQL queries without any understanding of the SQL knowledge. Take advantage of GuruSQL and save yourself precious time while enhancing productivity!",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
};

export default function GeneratorPage() {
  const userInfo = useUserStore(
    (state) =>
      state.userInfo || {
        total_rest: 0,
        today_rest: 0,
      }
  );
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);
  const [isAddSchema, setIsAddSchema] = useState(true);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [schema, setSchema] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [selectedTables, setSelectedTables] = useState([]);
  const [tables, setTables] = useState([]);
  const [addTableType, setAddTableType] = useState(ADD_TABLE_BY_SELECT); // ["table", "manually"
  const [databaseType, setDatabaseType] = useState(undefined);
  const analytics = useAnalytics();

  function handleGenerate() {
    if (userInfo.total_rest <= 0) {
      toast.error(`Total limit of ${TOTAL_LIMIT_GENSQL} requests reached.`);
      return;
    }
    if (userInfo.today_rest <= 0) {
      toast.error(`Daily limit of ${DAILY_LIMIT_GENSQL} requests reached.`);
      return;
    }
    setGenerateLoading(true);
    const data = {
      schema: schema,
      question: prompt,
      db_type: databaseType,
    };
    request
      .post({
        url: "/api/aigc/generate",
        data,
      })
      .then((res) => {
        const data = res.data.data;
        const sql = data.sql;
        toast.success(`${data.today_rest} requests left today.`);
        updateUserInfo({
          total_rest: data.total_rest,
          today_rest: data.today_rest,
        });
        setResult(sql);
        setGenerateLoading(false);
      })
      .catch(() => {
        toast.error(`Please try again.`);
      });
    analytics("generate_button_clicked");
  }

  function handleCopy() {
    copyToClipboard(result);
    analytics("copy_button_clicked");
  }
  return (
    <div className="w-full flex flex-col items-center justify-center xs:px-4">
      <div
        className={cn(
          "p-4 space-y-4 w-full md:max-w-2xl lg:max-w-5xl md:py-[40px] md:px-[50px] content-wrapper"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="title text-gray font-bold text-xl">
            SQL Generator
          </span>
          <span className="flex items-center">
            <span className="mr-3 text-primary-light font-medium text-lg">
              {`Add Table(s)`}
            </span>
            <Switch
              checked={isAddSchema}
              onCheckedChange={(e) => {
                setIsAddSchema(e);
                if (e) {
                  analytics("enable_add_schema");
                }
              }}
            ></Switch>
          </span>
        </div>
        {isAddSchema ? (
          <>
            <Radio
              options={RADIO_OPTIONS}
              value={addTableType}
              onChange={setAddTableType}
            />
            {addTableType === ADD_TABLE_BY_SELECT ? (
              <MutipleSelct
                options={tables}
                onChange={setTables}
              ></MutipleSelct>
            ) : (
              <div className="w-full mt-2">
                <Textarea
                  name="schema"
                  id="schema"
                  value={schema}
                  onChange={setSchema}
                  onFocus={analytics("schema_field_focused")}
                  className="textarea-content-card"
                  placeholder={SCHEMA_PLACEHOLDER}
                />
              </div>
            )}
          </>
        ) : null}
        <div>
          <label
            htmlFor="prompt"
            className="text-base font-medium text-primary-medium flex justify-between w-full cursor-pointer"
          >
            <span>{PROMPT_LABEL}</span>
          </label>
          <div className="w-full mt-2">
            <Textarea
              name="prompt"
              id="prompt"
              value={prompt}
              onChange={setPrompt}
              onFocus={analytics("question_field_focused")}
              className="textarea-content-card"
              placeholder={PROMPT_PLACEHOLDER}
            />
          </div>
          <div className="mt-4 flex justify-end items-center">
            <Select
              value={databaseType}
              placeholder="Database Type"
              options={[
                { value: "mysql", text: "MySQL" },
                { value: "postgresql", text: "PostgreSQL" },
                { value: "clickhouse", text: "ClickHouse" },
              ]}
              onChange={(e) => {
                setDatabaseType(e);
                analytics("switch_database_type");
              }}
            ></Select>
            <Tooltip
              className=" bg-white shadow-[0_3px_6px_0_rgba(0,0,0,0.08)] rounded-md px-4 py-3"
              content={
                <div className="w-60 font-normal text-gray-input">
                  <div>
                    Daily: &nbsp;
                    <span
                      style={{
                        color: `${
                          userInfo.today_rest <= DANGER_DAILY_LIMIT_GENSQL
                            ? RED.DEFAULT
                            : BLUE.DEFAULT
                        }`,
                      }}
                    >
                      {userInfo.today_rest}
                    </span>
                    &nbsp;requests left out of {DAILY_LIMIT_GENSQL}.
                  </div>
                  <div>
                    Total: &nbsp;
                    <span
                      style={{
                        color: `${
                          userInfo.total_rest <= DANGER_TOTAL_LIMIT_GENSQL
                            ? RED.DEFAULT
                            : BLUE.DEFAULT
                        }`,
                      }}
                    >
                      {userInfo.total_rest}
                    </span>
                    &nbsp;requests left out of {TOTAL_LIMIT_GENSQL}.
                  </div>
                </div>
              }
            >
              <Button
                disabled={prompt === "" || generateLoading}
                onClick={handleGenerate}
              >
                <svg
                  className={`${
                    generateLoading ? "animate-spin" : ""
                  }  mr-2 h-4 w-4 text-white`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.47186 18.4386L8.93755 16.6332C9.29121 16.1793 8.99707 15.3507 8.22275 15.4443L3.07135 16.0669C2.66829 16.1156 2.34921 16.4783 2.40381 16.8954L3.05129 21.8419C3.10567 22.2572 3.4956 22.5534 3.92647 22.4921C4.08567 22.4694 4.22533 22.4014 4.33425 22.3036L5.97443 20.2832C8.49532 21.6616 11.5584 22.0365 14.4587 21.1715C18.9344 19.8366 21.9921 15.8566 21.9999 11.3547C22.0074 11.0015 21.8698 10.6938 21.6245 10.4791C21.3885 10.2728 21.0873 10.1817 20.806 10.1807C20.5246 10.1796 20.2226 10.2684 19.985 10.473C19.7376 10.6861 19.5975 10.9934 19.6026 11.3473C19.5967 14.8462 17.2294 17.9321 13.7502 18.9699C11.6129 19.6074 9.36666 19.3782 7.47186 18.4386Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.7832 4.88559L13.4493 6.78308C13.1288 7.25906 13.4811 8.06647 14.247 7.92224L19.3421 6.96275C19.7407 6.88768 20.0333 6.50493 19.9491 6.09242L18.9514 1.19998C18.8676 0.789181 18.4575 0.519319 18.032 0.608759C17.8748 0.641838 17.7403 0.718889 17.6386 0.823639L16.1459 2.94703C13.5329 1.73731 10.4503 1.56444 7.61831 2.61792C3.24801 4.24365 0.480507 8.41509 0.792912 12.907C0.810525 13.2599 0.96967 13.5578 1.22971 13.7558C1.47978 13.9463 1.78678 14.0173 2.06752 13.9999C2.34829 13.9825 2.64324 13.8741 2.86573 13.6543C3.09743 13.4254 3.21531 13.1097 3.18507 12.757C2.94216 9.26584 5.08443 6.03165 8.48179 4.76785C10.5687 3.99152 12.826 4.07264 14.7832 4.88559Z"
                    fill="white"
                  />
                </svg>
                Generate
              </Button>
            </Tooltip>
          </div>
        </div>
        <div>
          <label
            htmlFor="result"
            className="block text-base font-medium text-primary-medium cursor-pointer"
          >
            {RESULT_LABEL}
          </label>
          <div className="w-full mt-2">
            <div
              className={cn(
                "whitespace-pre overflow-y-overlay hidden-scrollbar font-mono font-normal text-sm sm:text-base rounded-xl py-4 px-6 min-h-[210px]",
                `${result ? "text-primary" : "text-gray-placeholder"}`,
                courierPrime.className,
                "textarea-content-card"
              )}
            >
              {result ? result : RESULT_PLACEHOLDER}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleCopy} disabled={!result}>
              <svg
                className="mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
              >
                <g clipPath="url(#clip0_397_7266)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00001 2.3002C6.88956 2.3002 6.80001 2.38974 6.80001 2.5002V17.0002C6.80001 17.1107 6.88956 17.2002 7.00001 17.2002H19C19.1105 17.2002 19.2 17.1107 19.2 17.0002V7.3002H16.5C15.5059 7.3002 14.7 6.49431 14.7 5.5002V2.3002H7.00001ZM16.3 3.58496L18.2037 5.7002H16.5C16.3896 5.7002 16.3 5.61065 16.3 5.5002V3.58496ZM5.20001 2.5002C5.20001 1.50608 6.0059 0.700195 7.00001 0.700195H15.8563L20.8 6.19321V17.0002C20.8 17.9943 19.9941 18.8002 19 18.8002H17.3V20.5002C17.3 21.4943 16.4941 22.3002 15.5 22.3002H3.50001C2.5059 22.3002 1.70001 21.4943 1.70001 20.5002V5.5002C1.70001 4.50608 2.5059 3.7002 3.50001 3.7002H5.20001V2.5002ZM5.20001 5.3002H3.50001C3.38956 5.3002 3.30001 5.38974 3.30001 5.5002V20.5002C3.30001 20.6107 3.38956 20.7002 3.50001 20.7002H15.5C15.6105 20.7002 15.7 20.6107 15.7 20.5002V18.8002H7.00001C6.0059 18.8002 5.20001 17.9943 5.20001 17.0002V5.3002ZM9.20001 10.0002C9.20001 9.55837 9.55818 9.2002 10 9.2002H15.5C15.9418 9.2002 16.3 9.55837 16.3 10.0002C16.3 10.442 15.9418 10.8002 15.5 10.8002H10C9.55818 10.8002 9.20001 10.442 9.20001 10.0002ZM9.20001 13.5002C9.20001 13.0584 9.55818 12.7002 10 12.7002H15.5C15.9418 12.7002 16.3 13.0584 16.3 13.5002C16.3 13.942 15.9418 14.3002 15.5 14.3002H10C9.55818 14.3002 9.20001 13.942 9.20001 13.5002Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_397_7266">
                    <rect
                      width="22"
                      height="22"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
