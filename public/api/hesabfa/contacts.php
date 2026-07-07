<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$configPath = __DIR__ . '/config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'تنظیمات اتصال حسابفا روی سرور پیدا نشد.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require $configPath;

$page = max(1, (int)($_GET['page'] ?? 1));
$pageSize = min(100, max(1, (int)($_GET['pageSize'] ?? 10)));
$search = trim((string)($_GET['search'] ?? ''));

$filters = [];
if ($search !== '') {
    $filters[] = [
        'property' => 'Name',
        'operator' => '*',
        'value' => $search,
    ];
}

$payload = [
    'apiKey' => $config['apiKey'] ?? '',
    'userId' => $config['userId'] ?? '',
    'password' => $config['password'] ?? '',
    'loginToken' => $config['loginToken'] ?? '',
    'queryInfo' => [
        'sortBy' => 'Code',
        'sortDesc' => true,
        'take' => $pageSize,
        'skip' => ($page - 1) * $pageSize,
        'filters' => $filters,
    ],
];

$jsonPayload = json_encode($payload, JSON_UNESCAPED_UNICODE);
$endpoint = 'https://api.hesabfa.com/v1/contact/getContacts';
$responseBody = false;
$statusCode = 0;

if (function_exists('curl_init')) {
    $curl = curl_init($endpoint);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $jsonPayload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT => 30,
    ]);
    $responseBody = curl_exec($curl);
    $statusCode = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $curlError = curl_error($curl);
    curl_close($curl);
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $jsonPayload,
            'timeout' => 30,
        ],
    ]);
    $responseBody = file_get_contents($endpoint, false, $context);
    $curlError = '';
    $statusCode = $responseBody === false ? 0 : 200;
}

if ($responseBody === false || $statusCode >= 400) {
    http_response_code(502);
    echo json_encode([
        'success' => false,
        'message' => 'ارتباط با حسابفا برقرار نشد.',
        'detail' => $curlError ?? '',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$decoded = json_decode((string)$responseBody, true);

if (!is_array($decoded) || empty($decoded['Success'])) {
    http_response_code(502);
    echo json_encode([
        'success' => false,
        'message' => $decoded['ErrorMessage'] ?? 'پاسخ حسابفا نامعتبر بود.',
        'errorCode' => $decoded['ErrorCode'] ?? null,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$result = $decoded['Result'] ?? [];

echo json_encode([
    'success' => true,
    'result' => [
        'totalCount' => (int)($result['TotalCount'] ?? 0),
        'filteredCount' => (int)($result['FilteredCount'] ?? 0),
        'from' => (int)($result['From'] ?? 0),
        'to' => (int)($result['To'] ?? 0),
        'list' => $result['List'] ?? [],
    ],
], JSON_UNESCAPED_UNICODE);
