"use client";

import { useState } from "react";
import {
  Modal,
  Tabs,
  TextInput,
  NumberInput,
  Button,
  Stack,
  Group,
  Text,
  Paper,
  Badge,
  Divider,
  Switch,
  Alert,
} from "@mantine/core";
import { InfoCircle, Shield, TickCircle, Warning2 } from "iconsax-reactjs";
import { useParentControlsStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";

type ParentControlsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ParentControlsModal({ isOpen, onClose }: ParentControlsModalProps) {
  const { user } = useAuth();
  const {
    accountLinks,
    spendingLimits,
    pendingTransactions,
    createAccountLink,
    setSpendingLimit,
    approveTransaction,
    rejectTransaction,
    isChildAccount,
    getParentForChild,
    getAllPendingForParent,
  } = useParentControlsStore();

  const [activeTab, setActiveTab] = useState<string | null>("overview");
  
  // Link Account Form
  const [childEmail, setChildEmail] = useState("");
  const [linkingWallet, setLinkingWallet] = useState("");

  // Spending Limits Form
  const [dailyLimit, setDailyLimit] = useState<number>(50);
  const [weeklyLimit, setWeeklyLimit] = useState<number>(200);
  const [monthlyLimit, setMonthlyLimit] = useState<number>(500);
  const [perTxLimit, setPerTxLimit] = useState<number>(25);
  const [requiresApproval, setRequiresApproval] = useState(true);

  const isChild = isChildAccount(user?.id || "");
  const parentLink = getParentForChild(user?.id || "");
  const pendingApprovals = getAllPendingForParent(user?.id || "");

  const handleLinkAccount = () => {
    if (!childEmail || !linkingWallet || !user) return;

    createAccountLink({
      parentUserId: user.id,
      parentEmail: user.email || "",
      childUserId: `child_${Date.now()}`, // In real app, this would come from child's auth
      childEmail,
      childWallets: [linkingWallet],
    });

    setChildEmail("");
    setLinkingWallet("");
  };

  const handleSetLimit = () => {
    if (!linkingWallet) return;

    setSpendingLimit(linkingWallet, {
      dailyLimit,
      weeklyLimit,
      monthlyLimit,
      perTransactionLimit: perTxLimit,
      requiresApproval,
    });
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="xl"
      radius="lg"
      title={
        <Group gap="xs">
          <Shield size={24} className="text-blue-500" />
          <Text fw={600} size="lg">
            Parent Controls & Spending Limits
          </Text>
        </Group>
      }
    >
      {isChild && parentLink && (
        <Alert icon={<InfoCircle size={16} />} color="blue" mb="md">
          <Text size="sm">
            This account is managed by {parentLink.parentEmail}. Spending limits apply.
          </Text>
        </Alert>
      )}

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="overview">
            Overview
            {pendingApprovals.length > 0 && (
              <Badge size="sm" color="orange" ml="xs">
                {pendingApprovals.length}
              </Badge>
            )}
          </Tabs.Tab>
          <Tabs.Tab value="link">Link Child Account</Tabs.Tab>
          <Tabs.Tab value="limits">Set Spending Limits</Tabs.Tab>
          <Tabs.Tab value="approvals">Pending Approvals</Tabs.Tab>
        </Tabs.List>

        {/* Overview Tab */}
        <Tabs.Panel value="overview" pt="md">
          <Stack gap="md">
            <Paper withBorder p="md" radius="md">
              <Group justify="space-between" mb="sm">
                <Text fw={600}>Linked Accounts</Text>
                <Badge color="blue">{accountLinks.length}</Badge>
              </Group>
              <Divider mb="sm" />
              {accountLinks.length === 0 ? (
                <Text size="sm" c="dimmed" ta="center" py="md">
                  No linked accounts yet
                </Text>
              ) : (
                <Stack gap="xs">
                  {accountLinks.map((link) => (
                    <Paper key={link.id} withBorder p="sm" radius="md">
                      <Group justify="space-between">
                        <div>
                          <Text size="sm" fw={500}>
                            {link.childEmail}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {link.childWallets.length} wallet(s) monitored
                          </Text>
                        </div>
                        <Badge color={link.status === "active" ? "green" : "yellow"}>
                          {link.status}
                        </Badge>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Group justify="space-between" mb="sm">
                <Text fw={600}>Active Spending Limits</Text>
                <Badge color="purple">{Object.keys(spendingLimits).length}</Badge>
              </Group>
              <Divider mb="sm" />
              {Object.keys(spendingLimits).length === 0 ? (
                <Text size="sm" c="dimmed" ta="center" py="md">
                  No spending limits configured
                </Text>
              ) : (
                <Stack gap="xs">
                  {Object.entries(spendingLimits).map(([address, limit]) => (
                    <Paper key={address} withBorder p="sm" radius="md">
                      <Text size="xs" c="dimmed" mb="xs">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </Text>
                      <Group gap="lg">
                        <div>
                          <Text size="xs" c="dimmed">
                            Daily
                          </Text>
                          <Text size="sm" fw={500}>
                            ${limit.dailyLimit}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" c="dimmed">
                            Weekly
                          </Text>
                          <Text size="sm" fw={500}>
                            ${limit.weeklyLimit}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" c="dimmed">
                            Monthly
                          </Text>
                          <Text size="sm" fw={500}>
                            ${limit.monthlyLimit}
                          </Text>
                        </div>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>
        </Tabs.Panel>

        {/* Link Account Tab */}
        <Tabs.Panel value="link" pt="md">
          <Stack gap="md">
            <Alert icon={<InfoCircle size={16} />} color="blue">
              <Text size="sm">
                Link a child's account to enable spending limits and transaction approvals.
                Age 18+ accounts don't require parent controls.
              </Text>
            </Alert>

            <TextInput
              label="Child's Email"
              placeholder="child@example.com"
              value={childEmail}
              onChange={(e) => setChildEmail(e.target.value)}
              required
            />

            <TextInput
              label="Child's Wallet Address"
              placeholder="0x..."
              value={linkingWallet}
              onChange={(e) => setLinkingWallet(e.target.value)}
              required
            />

            <Button
              onClick={handleLinkAccount}
              disabled={!childEmail || !linkingWallet}
              leftSection={<TickCircle size={16} />}
            >
              Link Account
            </Button>
          </Stack>
        </Tabs.Panel>

        {/* Spending Limits Tab */}
        <Tabs.Panel value="limits" pt="md">
          <Stack gap="md">
            <Alert icon={<Warning2 size={16} />} color="yellow">
              <Text size="sm">
                These limits are enforced in the UI only. For blockchain-enforced limits,
                consider using a multisig wallet or smart contract.
              </Text>
            </Alert>

            <TextInput
              label="Wallet Address"
              placeholder="0x..."
              value={linkingWallet}
              onChange={(e) => setLinkingWallet(e.target.value)}
              required
            />

            <NumberInput
              label="Daily Limit (USD)"
              value={dailyLimit}
              onChange={(val) => setDailyLimit(Number(val))}
              min={0}
              prefix="$"
            />

            <NumberInput
              label="Weekly Limit (USD)"
              value={weeklyLimit}
              onChange={(val) => setWeeklyLimit(Number(val))}
              min={0}
              prefix="$"
            />

            <NumberInput
              label="Monthly Limit (USD)"
              value={monthlyLimit}
              onChange={(val) => setMonthlyLimit(Number(val))}
              min={0}
              prefix="$"
            />

            <NumberInput
              label="Per Transaction Limit (USD)"
              value={perTxLimit}
              onChange={(val) => setPerTxLimit(Number(val))}
              min={0}
              prefix="$"
            />

            <Switch
              label="Require parent approval for transactions"
              checked={requiresApproval}
              onChange={(e) => setRequiresApproval(e.currentTarget.checked)}
            />

            <Button onClick={handleSetLimit} disabled={!linkingWallet} leftSection={<Shield size={16} />}>
              Set Spending Limits
            </Button>
          </Stack>
        </Tabs.Panel>

        {/* Approvals Tab */}
        <Tabs.Panel value="approvals" pt="md">
          <Stack gap="md">
            {pendingApprovals.length === 0 ? (
              <Text size="sm" c="dimmed" ta="center" py="xl">
                No pending approval requests
              </Text>
            ) : (
              pendingApprovals.map((tx) => (
                <Paper key={tx.id} withBorder p="md" radius="md">
                  <Group justify="space-between" mb="sm">
                    <Badge color="orange">Pending Approval</Badge>
                    <Text size="xs" c="dimmed">
                      {new Date(tx.requestedAt).toLocaleString()}
                    </Text>
                  </Group>
                  <Stack gap="xs">
                    <Group>
                      <Text size="sm" fw={500}>
                        Amount:
                      </Text>
                      <Text size="sm">${tx.amount}</Text>
                    </Group>
                    <Group>
                      <Text size="sm" fw={500}>
                        To:
                      </Text>
                      <Text size="sm" ff="monospace">
                        {tx.toAddress.slice(0, 10)}...{tx.toAddress.slice(-8)}
                      </Text>
                    </Group>
                    {tx.reason && (
                      <Group>
                        <Text size="sm" fw={500}>
                          Reason:
                        </Text>
                        <Text size="sm">{tx.reason}</Text>
                      </Group>
                    )}
                  </Stack>
                  <Group mt="md">
                    <Button
                      color="green"
                      onClick={() => approveTransaction(tx.id, user?.id || "")}
                      size="sm"
                    >
                      Approve
                    </Button>
                    <Button color="red" onClick={() => rejectTransaction(tx.id)} size="sm" variant="outline">
                      Reject
                    </Button>
                  </Group>
                </Paper>
              ))
            )}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
