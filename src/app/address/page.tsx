'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Grid,
  Title,
  Text,
  TextInput,
  Select,
  Radio,
  Group,
  Button,
  Paper,
  Divider,
  Stack,
  Badge,
} from '@mantine/core';
import {
  IconMapPin,
  IconShieldCheck,
  IconArrowRight,
  IconTruckDelivery,
} from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import { AdBanner } from '@/components/ads/AdBanner';

export default function AddressPage() {
  const router = useRouter();
  const { cartTotal, cartCount } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    houseNo: '',
    area: '',
    city: '',
    state: 'Maharashtra',
    addressType: 'home',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab',
    'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = 'Valid 6-digit PIN code is required';
    if (!formData.houseNo.trim()) newErrors.houseNo = 'House / Flat details required';
    if (!formData.city.trim()) newErrors.city = 'City / Town is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save address and proceed to final payment step
    try {
      localStorage.setItem('smartshopping_saved_address', JSON.stringify(formData));
    } catch (e) {
      // ignore
    }

    router.push('/payment');
  };

  return (
    <Box py="lg">
      <Container size="lg">
        {/* Step Indicator */}
        <Paper withBorder p="xs" radius="md" mb="md" style={{ backgroundColor: '#ffffff' }}>
          <Group justify="space-around">
            <Group gap={6}>
              <Badge circle color="green" size="sm">✓</Badge>
              <Text size="xs" fw={700}>1. Cart</Text>
            </Group>
            <Text c="dimmed">→</Text>
            <Group gap={6}>
              <Badge circle color="pink" size="sm">2</Badge>
              <Text size="xs" fw={700} c="#9f2089">2. Delivery Address</Text>
            </Group>
            <Text c="dimmed">→</Text>
            <Group gap={6}>
              <Badge circle color="gray" size="sm">3</Badge>
              <Text size="xs" c="dimmed">3. Payment</Text>
            </Group>
          </Group>
        </Paper>

        <Grid gutter="xl">
          {/* Address Form */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper withBorder p="lg" radius="md" style={{ backgroundColor: '#ffffff' }}>
              <Group gap="xs" mb="md">
                <IconMapPin size={22} color="#9f2089" />
                <Title order={2} size="h4" fw={800} c="dark.8">
                  Add Delivery Address
                </Title>
              </Group>

              <form onSubmit={handleSubmit}>
                <Stack gap="sm">
                  <Grid gutter="sm">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Full Name *"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.currentTarget.value })}
                        error={errors.fullName}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Mobile Number (10 digits) *"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.currentTarget.value })}
                        error={errors.phone}
                        maxLength={10}
                        required
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid gutter="sm">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Pincode *"
                        placeholder="6 digits PIN"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.currentTarget.value })}
                        error={errors.pincode}
                        maxLength={6}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="City / Town *"
                        placeholder="e.g. Mumbai, Surat, Delhi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.currentTarget.value })}
                        error={errors.city}
                        required
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid gutter="sm">
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Flat, House no., Building *"
                        placeholder="e.g. Flat 302, Sai Heights"
                        value={formData.houseNo}
                        onChange={(e) => setFormData({ ...formData, houseNo: e.currentTarget.value })}
                        error={errors.houseNo}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Area, Street, Sector, Village"
                        placeholder="e.g. MG Road, Near Station"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.currentTarget.value })}
                      />
                    </Grid.Col>
                  </Grid>

                  <Select
                    label="State *"
                    data={indianStates}
                    value={formData.state}
                    onChange={(val) => setFormData({ ...formData, state: val || 'Maharashtra' })}
                    searchable
                  />

                  <Box mt="xs">
                    <Text size="xs" fw={700} c="dimmed" mb={4}>
                      Address Type:
                    </Text>
                    <Radio.Group
                      value={formData.addressType}
                      onChange={(val) => setFormData({ ...formData, addressType: val })}
                    >
                      <Group gap="lg">
                        <Radio value="home" label="Home (All day delivery)" />
                        <Radio value="work" label="Work (Delivery between 10 AM - 6 PM)" />
                      </Group>
                    </Radio.Group>
                  </Box>

                  {/* High Value In-Form Advertisement */}
                  <Box my="sm">
                    <AdBanner slotKey="addressPage" format="horizontal" />
                  </Box>

                  <Button
                    type="submit"
                    size="md"
                    radius="md"
                    mt="sm"
                    style={{
                      backgroundColor: '#ffc200',
                      color: '#000000',
                      fontWeight: 700,
                    }}
                    rightSection={<IconArrowRight size={18} />}
                  >
                    Save Address & Continue
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid.Col>

          {/* Price Summary */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper withBorder p="md" radius="md" style={{ backgroundColor: '#ffffff', position: 'sticky', top: '100px' }}>
              <Title order={4} size="h5" fw={700} mb="md" c="dark.7">
                ORDER SUMMARY
              </Title>

              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Items in Cart</Text>
                  <Text size="sm" fw={600}>{cartCount}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Subtotal</Text>
                  <Text size="sm" fw={600}>₹{cartTotal.toFixed(2)}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Delivery Charges</Text>
                  <Text size="sm" fw={700} c="green.7">FREE</Text>
                </Group>
                <Divider my="xs" />
                <Group justify="space-between">
                  <Text size="md" fw={800}>Total Payable</Text>
                  <Text size="lg" fw={900} c="#9f2089">₹{cartTotal.toFixed(2)}</Text>
                </Group>
              </Stack>

              <Box p="xs" mt="md" style={{ backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
                <Group gap={6}>
                  <IconTruckDelivery size={18} color="#16a34a" />
                  <Text size="xs" fw={700} c="#16a34a">
                    Estimated Delivery: 2-4 Days
                  </Text>
                </Group>
              </Box>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
